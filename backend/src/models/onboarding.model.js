import mongoose from 'mongoose';

const CollegeDetailsSchema = new mongoose.Schema({
  // STEP 1: General Details
  generalDetails: {
    incubationCenterName: { type: String },
    expertise: { type: String },
    address: { type: String },
    totalAreaAvailable: { type: String },
    targetStartupCapacity: { type: Number },
    dateOfFoundation: { type: Date },
    industryFocus: { type: String },
    aboutCampus: { type: String },
  },

  // STEP 2: Physical Space Requirements
  physicalSpace: {
    spaceType: { type: String },
    areaRequired: { type: String },
    capacity: { type: String},
    purpose: { type: String },
    duration: { type: String },
    industryFocus: { type: String },
    notes: { type: String },
  },

  // STEP 3: IT & Digital Infrastructure
  itDigitalInfra: {
    infrastructureName: { type: String },
    type: { type: String },
    capacity: { type: String },
    availability: { type: String },
    provider: { type: String },
    contact: { type: String },
    industryFocus: { type: String },
    notes: { type: String },
  },

  // STEP 4: Operational Services
  operationalServices: {
    serviceName: { type: String },
    provider: { type: String },
    availability: { type: String },
    cost: { type: String },
    contact: { type: String },
    serviceType: { type: String },
    industryFocus: { type: String },
    notes: { type: String },
  },

  // STEP 5: Digital Tools & Software
  digitalToolsSoftware: {
    toolName: { type: String },
    type: { type: String },
    license: { type: String },
    provider: { type: String },
    availability: { type: String },
    contact: { type: String },
    industryFocus: { type: String },
    notes: { type: String },
  },

  // STEP 6: Specialized Labs
  specializedLabs: {
    labName: { type: String },
    keyEquipment: { type: String },
    capacity: { type: String },
    labType: { type: String },
    availability: { type: String },
    supervisor: { type: String },
    industryFocus: { type: String },
    notes: { type: String },
  },

  // STEP 7: Additional Facilities
  additionalFacilities: {
    facilityName: { type: String },
    type: { type: String },
    availability: { type: String },
    provider: { type: String },
    contact: { type: String },
    industryFocus: { type: String },
    notes: { type: String },
  },

  // STEP 8: Payment Details
  paymentDetails: {
    accountName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    branch: { type: String },
    paymentMode: { type: String },
    gstNumber: { type: String },
    notes: { type: String },
  }
});


export default mongoose.model('CollegeDetails', CollegeDetailsSchema);