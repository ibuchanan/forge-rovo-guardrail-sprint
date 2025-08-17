# Sprint: Platform Security

Goal:

## Epic: MOBL-1 iOS Platform Update

### Story: MOBL-28 Spike: Does site load in <1s when user volume exceeds 20k?

* Assignee: Alana Grant
* Status: To Do

As a mobile app user, I want the site to load in less than 1 second even when there are more than 20,000 concurrent users, so that I have a fast and responsive experience regardless of user volume.

This is a 2 day spike to make sure the site loads <1s when there are more than 20k users. The customer MediHalon is expected to reach 20k users before the end of this year.

### Story: MOBL-8 Password security update

* Assignee: Lisbeth Salander
* Status: To Do

As a user, I want to receive a notification if my password is found in a known data breach, so that I can update it immediately and keep my account secure.

### Task: MOBL-20 Change login related support documentation

* Assignee: Doc Holiday
* Status: To Do

Revise the login related support documentation to ensure clarity, accuracy, and alignment with current processes. This includes reviewing existing content, identifying gaps, and implementing necessary changes to enhance user understanding and support efficiency.

### Bug: MOBL-11 Typo on Contact Us page

* Assignee: Doc Holiday
* Status: In Progress

There is a typo on the Contact Us page where the word 'adress' is used instead of the correct spelling 'address'; this should be corrected to improve professionalism and user trust.

### Story: MOBL-15 Fingerprint identity

* Assignee: Lisbeth Salander
* Status: Testing

As a mobile app user, I want to use fingerprint authentication to log in, so that I can access my account quickly and securely without entering a password.

### Task: MOBL-18 iOS Version Upgrade Notes

* Assignee: Doc Holiday
* Status: Accepted

Write, review, and publish the upgrade notes to Confluence and then the Apple App Store release notes section. Notify stakeholders and users about the new version and its changes.

## Epic: MOBL-3 Vendor Dashboard

### Story: MOBL-10 Warn vendors about 2FA changes coming soon

* Assignee: Alana Grant
* Status: In Progress

As a vendor admin, I want to receive proactive notifications about upcoming changes to 2FA requirements, so that I have sufficient time to update authentication processes for my organization and ensure uninterrupted access to Atlassian systems.

## Epic: MOBL-6 Customer Application Form

### Task: MOBL-23 Confirm login addendum from legal

* Assignee: Alana Grant
* Status: To Do

Ensure that all required legal reviews are complete and documented before proceeding with implementation. Communicate confirmation to relevant stakeholders.

## Epic: MOBL-5 Android Version Update

### Story: MOBL-26 Android Version Upgrade Notes

* Assignee: Doc Holliday
* Status: To Do

Write, review, and publish the upgrade notes to Confluence and then the Google Play Store release notes section. Notify stakeholders and users about the new version and its changes.

## Epic: MOBL-2 Mobile App Authentication

### Story: MOBL-40 Mobile User Registration

* Assignee: Alana Grant
* Status: Architecture Review

As a new mobile app user, I want to quickly and securely register for the app using my mobile device, so that I can start using the app’s features without unnecessary friction and feel confident that my information is protected. Use device security features to help customers opt-into streamlined registration.

### Story: MOBL-43 Mobile User Login

* Assignee: Alana Grant
* Status: To Do

As a returning mobile app user, I want to securely and quickly log in to the app using my mobile device, so that I can access my account and app features without unnecessary steps and with confidence in the security of my information. Use device security features and passkeys to help customers opt-into streamlined login via face or touch where available.

### Story: MOBL-47 Two-Factor Authentication

* Assignee: Alana Grant
* Status: To Do

As a returning user on web who also uses the mobile app, I want to log in to my account using two-factor authentication from the mobile app, so that I can be confident my account is secure, even if my password is leaked.

## Story: MOBL-40 Mobile User Registration

### Sub-task: MOBL-41  Develop backend logic for user registration

* Assignee: Alana Grant
* Status: To Do

Design and implement the backend logic to support secure, efficient, and streamlined user registration for the mobile app. The backend must:
* Expose a dedicated registration API optimized for mobile clients (e.g., minimal required fields, support for phone/email/social login).
* Integrate with device security features (such as biometrics or secure enclave attestation) to allow users to opt into enhanced security during registration, when supported by the device.
* Centralize business logic for validation, duplicate account checks, and user profile creation to ensure consistency across iOS and Android.
* Orchestrate calls to dependent services (e.g., consent management, notification, identity verification) as needed for the registration flow.
* Implement robust error handling, logging, and monitoring for registration events.
* Ensure all sensitive data is handled securely and in compliance with relevant standards.
* Provide clear API documentation and sample requests for mobile client integration.

### Sub-task: MOBL-42  Implement data validation for user registration

* Assignee: Alana Grant
* Status: To Do

Design and implement robust data validation logic for the user registration process in the backend. The validation must:
* Ensure all required fields (e.g., email, phone number, password) are present and correctly formatted.
* Enforce password strength and uniqueness requirements.
* Validate phone numbers and emails using appropriate libraries or services.
* Prevent duplicate account creation by checking for existing users.
* Provide clear, actionable error messages for invalid input.
* Log validation failures for monitoring and troubleshooting.
* Support localization of validation messages where applicable.

## Story: MOBL-43 Mobile User Login

### Sub-task: MOBL-45 Create a backend authentication API for user login

* Assignee: undefined
* Status: To Do

null

### Sub-task: MOBL-46 Implement secure password storage mechanisms

* Assignee: undefined
* Status: To Do

null

## Story: MOBL-47 Two-Factor Authentication

### Sub-task: MOBL-48 Research and integrate two-factor authentication methods

* Assignee: undefined
* Status: To Do

null

### Sub-task: MOBL-49 Implement account recovery options for users

* Assignee: undefined
* Status: To Do

null

### Sub-task: MOBL-50 Conduct testing for two-factor authentication flow

* Assignee: undefined
* Status: To Do

null
