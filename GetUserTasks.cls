/**
 * @description This class is used to get list of task of current user
 */
public with sharing class GetUserTasks {

    /**
     * @description This method fetches tasks of current users which are not completed
     * @return listOfTasks
     */
    @AuraEnabled (cacheable = true)
    public static List<Task> getCurrentUserTasks() {

        List<Task> listOfTasks = [
            SELECT
              Id,
              Subject,
              Status, 
              Priority,
              ActivityDate
           FROM 
             Task 
           WHERE
             OwnerId = :UserInfo.getUserId() 
          AND Status != 'Completed'   
       ];
        return listOfTasks;
    }
    
    /**
     * @description This method is used to insert new tasks
     * @param subject
     * @param dueDate
     * @param priority
     */
    @AuraEnabled
    public static void insertTask(String subject, Date dueDate, String priority) {
        try {
          Task taskRecord = new Task();
          taskRecord.ActivityDate = dueDate;
          taskRecord.Subject = subject;
          taskRecord.Priority = priority;
          insert taskRecord;
        } catch (Exception e) {
          System.debug('--->'+e);
        }
     }

}