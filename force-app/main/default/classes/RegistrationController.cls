public without sharing class RegistrationController {
    
    @AuraEnabled
    public static String createContact(String firstName, String lastName, String email, String accName){
        try{
            Id accId = [SELECT Id FROM Account WHERE Name = :accName limit 1].Id;
            Contact newCon = new Contact(
            	FirstName = firstName,
            	LastName = lastName,
            	Email = email,
            	AccountId = accId
            );
            insert newCon;
            return newCon.Id;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String createCommunityUser(String firstname, String lastname, String email, String username, String accname){
        try {
            String conId = createContact(firstname, lastname, email, accname);
            User newUser = new User(
                FirstName = firstName,
                LastName = lastName,
                Username = username,
                Email = email,
                ContactId = conId,
                ProfileId = [SELECT Id FROM Profile WHERE Name = 'Customer Community User' limit 1].Id,
                Alias = firstName.substring(0,3)+lastName.substring(0,3),
                
                TimeZoneSidKey = 'America/Los_Angeles',
                LocaleSidKey = 'en_US',
                EmailEncodingKey = 'UTF-8',
                LanguageLocaleKey = 'en_US'

            );
            insert newUser;
            return newUser.Id;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return (e.getMessage());
        }
    }
}