import CollegeDetails from '../models/onboarding.model.js';
import { asyncHandler } from '../utils/asyncHandler.js'; 

const createCollegeDetails = asyncHandler(async (req, res) => {
   const {
    generalDetails,
    physicalSpace,
    itDigitalInfra,
    operationalServices,
    digitalToolsSoftware,
    specializedLabs,
    additionalFacilities,
    paymentDetails
  } = req.body;

   console.log("Received college details:", req.body);

    const exists = await CollegeDetails.findOne({
    "generalDetails.incubationCenterName": generalDetails.incubationCenterName
  });

  if (exists) {
    return res.status(409).json({
      success: false,
      message: "A record with this incubation center name already exists."
    });
  }

  const newEntry = await CollegeDetails.create({
    generalDetails,
    physicalSpace,
    itDigitalInfra,
    operationalServices,
    digitalToolsSoftware,
    specializedLabs,
    additionalFacilities,
    paymentDetails
  });
   res.status(201).json({
    success: true,
    message: "College details saved successfully",
    data: newEntry
  });
});


export { createCollegeDetails };

// Helper to map DB document to list card format expected by frontend
const mapCollegeToListItem = (doc) => {
  const general = doc.generalDetails || {};
  const totalSections = 8; // total top-level steps captured in the schema

  const sections = [
    'generalDetails',
    'physicalSpace',
    'itDigitalInfra',
    'operationalServices',
    'digitalToolsSoftware',
    'specializedLabs',
    'additionalFacilities',
    'paymentDetails',
  ];

  const documentsFilled = sections.reduce((count, key) => {
    const value = doc[key];
    if (value && Object.keys(value.toObject ? value.toObject() : value).length > 0) {
      return count + 1;
    }
    return count;
  }, 0);

  return {
    id: String(doc._id),
    name: general.incubationCenterName || 'Unnamed Incubation Center',
    isOnline: true,
    planStatus: 'active', // default until there is a real lifecycle field
    startupCount: general.targetStartupCapacity || 0,
    documentsFilled,
    totalDocuments: totalSections,
    establishedDate: general.dateOfFoundation || null,
    activeStartups: 0,
    inactiveStartups: 0,
    expertise: general.expertise || 'General',
    location: general.address || 'N/A',
  };
};

// Helper to map DB document to detail view format expected by frontend
const mapCollegeToDetail = (doc) => {
  const general = doc.generalDetails || {};
  return {
    id: String(doc._id),
    name: general.incubationCenterName || 'Unnamed Incubation Center',
    expertise: general.expertise || 'General',
    establishedDate: general.dateOfFoundation || null,
    totalArea: general.totalAreaAvailable || 'N/A',
    inactiveStartups: 0,
    startupCount: general.targetStartupCapacity || 0,
    activeStartups: 0,
    industryFocus: general.industryFocus || 'N/A',
    location: general.address || 'N/A',
    aboutCampus: general.aboutCampus || 'N/A',
    // Pass through nested sections that detail components expect
    specializedLabs: doc.specializedLabs || {},
    itDigitalInfra: doc.itDigitalInfra || {},
    paymentDetails: doc.paymentDetails || {},
    // Minimal contact info used in manager card
    contactInfo: {
      accountName: doc.paymentDetails?.accountName || 'N/A',
      contact:
        doc.digitalToolsSoftware?.contact ||
        doc.operationalServices?.contact ||
        'N/A',
    },
    // Optional stats not in schema; defaulted
    totalMentors: 0,
    meetingRooms: 0,
    staffCount: 0,
    fundRaised: 'N/A',
    jobsCreated: 'N/A',
  };
};

const getAllCollegeDetails = asyncHandler(async (req, res) => {
  const docs = await CollegeDetails.find({}).lean(false); // keep mongoose docs for nested toObject checks
  const data = docs.map((d) => mapCollegeToListItem(d));
  return res.status(200).json({ success: true, data });
});

const getCollegeDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const doc = await CollegeDetails.findById(id);
  if (!doc) {
    return res.status(404).json({ success: false, message: 'College not found' });
  }
  const data = mapCollegeToDetail(doc);
  return res.status(200).json({ success: true, data });
});

export { getAllCollegeDetails, getCollegeDetailsById };