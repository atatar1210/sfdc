import { LightningElement, wire ,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { RefreshEvent } from 'lightning/refresh';
import getTasks from '@salesforce/apex/GetUserTasks.getCurrentUserTasks';
import USER_ID from '@salesforce/user/Id';
import insertTask from '@salesforce/apex/GetUserTasks.insertTask';

import ID_FIELD from "@salesforce/schema/Task.Id";
import STATUS_FIELD from "@salesforce/schema/Task.Status";

export default class TaskManager extends LightningElement {

    @track columns = [{

        label: 'Subject',
        fieldName: 'Subject',
        type: 'text',
        sortable: true
    },
    {
        label: 'Priority',
        fieldName: 'Priority',
        type: 'Picklist',
        sortable: true
    },
    {
        label: 'Status',
        fieldName: 'Status',
        type: 'Picklist',
        sortable: true,
        editable: true
    },
    {
        label: 'Due Date',
        fieldName: 'ActivityDate',
        type: 'Date',
        sortable: true
    }
];

@track error;
@track taskList ;
userId = USER_ID;
tasks;
@track isShowModal = false;


/**
 * @description Method to fetch tasks of current user
 */
@wire(getTasks)
wiredAccounts({
    error,
    data
}) {
    if (data) {
        this.taskList = data;
    } else if (error) {
        this.error = error;
    }
}

/**
 * @description Method to set isShowModa attribute to true
 */
showModalBox() {  
    this.isShowModal = true;
}

/**
 * @description Method to set isShowModa attribute to false
 */
hideModalBox() {  
    this.isShowModal = false;
}

/**
 * @description Method to handle Subject change
 */
handleSubjectChange(event) {
    this.subjectFieldValue = event.target.value;
}

/**
 * @description Method to handle Date change
 */
handleDueDateChange(event) {
    this.DateFieldValue = event.target.value;
}

/**
 * @description Method to handle Priority change
 */
handlePriorityChange(event) {
    this.priorityFieldValue = event.target.value;
}

/**
 * @description Method to save the newly created task from Modal
 * @param subject
 * @param dueDate
 * @param priority
 */
handleSave() {
    insertTask({
        subject : this.subjectFieldValue,
        dueDate : this.DateFieldValue,
        priority : this.priorityFieldValue
    })
    .then(result => {
      // Show success messsage
      this.dispatchEvent(new ShowToastEvent({
        title: 'Success!!',
        message: 'Task Created Successfully!!',
        variant: 'success'
      }), );
      this.dispatchEvent(new RefreshEvent());
    })
    .catch(error => {
        const event = new ShowToastEvent({
            title : 'Error',
            message : 'Error creating Task. Please Contact System Admin',
            variant : 'error'
        });
        this.dispatchEvent(event);
});
this.hideModalBox();
}

}