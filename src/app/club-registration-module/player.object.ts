import { Timestamp } from '@google-cloud/firestore';

export class MemberObject {

    memberDetails: {
        firstName: string;
        lastName: string;
        address: {
            house: string;
            street: string;
            postalCode: string,
            city: string;
            country?: string;
        };
        mobileNumber: [{mobile: string}];
        emailAddress: [{email: string}];
    };
    emergancyContact?: {
        relationship: string;
        firstName: string;
        lastName: string;
        mobileNumber: string;
        emailAddress: string;
    };
    medicalInformation?: {
        doctorName: string;
        surgeryName: string;
        doctorContactNumber: string;
        allergies: string;
        conditionsMedications: string;
        consentToShare: string;
        medicalConsentTimestamp?: Timestamp;
        };
    photohraphyConsent: {
        photoVideoConsent: boolean;
        }
    memberStatements: {
        declareDetailsCorrect: boolean;
        declareAgreeToClubPrivacyStatement: boolean;
        declareAgreeToTakePartInClubActivities: boolean;
        signature: string;
        declerationDate?: Timestamp;
    };
}

