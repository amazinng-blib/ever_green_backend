const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../../models/user-model');
const LicenseModel = require('../../models/license-model');
const { default: mongoose } = require('mongoose');
const formatDateToDDMMYY = require('../../utils/date-formatter');
const hasPlanExpired = require('../../utils/check-plan-validity');

/*
 **Request for license Key
 **
 **
 **
 */

const requestForLicenseKey = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const { trading_Id } = req?.body;
  const userObjectId = new mongoose.Types.ObjectId(userId);

  try {
    // todo: check if the user exist
    const userExist = await UserModel.findById(userId);

    if (!userExist) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    // todo: check if he has any active license key running

    const licenses = await LicenseModel.find({ user_id: userObjectId });
    const lastLicenseIndex = licenses?.length - 1;
    const recentSubScribedLicense = licenses[lastLicenseIndex];
    const isActive = recentSubScribedLicense?.status === 'active';

    if (licenses !== undefined && isActive) {
      return res
        .status(400)
        .json({ message: 'You still have active license running' });
    }

    // todo: initialise license obj for the user

    const licenseObj = {
      trading_Id,
      user_id: userId,
    };

    const userLicense = new LicenseModel(licenseObj);
    await userLicense.save();
    // todo: send email to admin
    return res.status(201).json({ message: 'Request Sent', userLicense });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

/*
 **Assign license Key to user by admin
 **
 **
 **
 */

const assignLicenseKey = expressAsyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const userToAssignLicenseKeyId = req?.body?.user_Id;
  const license_key = req?.body?.license_key;
  const licenseId = req.params?.id;

  //   todo: convert userToAssignLicenseKeyId to mongoose ID format
  //   const userObjectId = mongoose.Types.ObjectId(userToAssignLicenseKeyId);

  try {
    const loggedInUser = await UserModel.findById(userId);
    const userToAssignLicenseKey = await UserModel.findById(
      userToAssignLicenseKeyId
    );
    // todo: get the users license document

    const userLicense = await LicenseModel.findById(licenseId);

    const amount = userToAssignLicenseKey?.plan?.amount_payed;

    const isUser = loggedInUser?.role === 'User';

    if (isUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // todo: check if the user to assign license key exist

    if (!userToAssignLicenseKey) {
      return res.status(404).json({ message: 'User Not found' });
    }

    if (!userLicense) {
      return res.status(404).json({ message: 'License instance not found' });
    }

    // todo: get date
    const currentDate = new Date(Date.now());
    const date_purchased = formatDateToDDMMYY(currentDate);
    userLicense.amount = amount;
    userLicense.date_purchased = date_purchased;
    userLicense.license_key = license_key;

    await userLicense.save();

    // todo: send email to the user, notifying the person that license key has been generated for the person
    return res.status(200).json({ message: 'License assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
});

/*
 **Assign license Key to user by admin
 **
 **
 **
 */

const toggleLicenseKeyStatusToExpired = expressAsyncHandler(
  async (req, res) => {
    const userId = req?.user?._id;
    const licenseId = req?.body?.license_id;
    try {
      const user = await UserModel.findById(userId);
      const userLicense = await LicenseModel.findById(licenseId);

      const plan_duration = user?.plan?.plan_duration;
      const date_purchased = userLicense?.date_purchased;

      const hasUserLicenseExpired = hasPlanExpired(
        date_purchased,
        plan_duration
      );

      if (hasUserLicenseExpired) {
        user.plan.has_completed_subscription = true;
        userLicense.status = expired;

        await user.save();
        await userLicense.save();
        return res
          .status(200)
          .json({ message: 'License Key toggled to expired' });
      }
    } catch (error) {
      res.status(500).json({ error: error?.message });
    }
  }
);

module.exports = {
  requestForLicenseKey,
  assignLicenseKey,
  toggleLicenseKeyStatusToExpired,
};
