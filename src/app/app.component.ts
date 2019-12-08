import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'task-list';
  public taskObject = {
    dropdownList : [],
    showHideSubTasksList:false,
    showHideTableInputs:false,
    selectedTask:'',
    headers:[]
  }
  public selectedItems = [];
  public mainSelectedItems = [];
  public dropdownSettings = {};
  public finalCreatedTaskList:any = [];
  public obj={};
  public tasks = [
          {
            "task":"AAA",
            "tableHeaders":[
                {
                    "headerName":"AAAaction1"
                },
                {
                    "headerName":"AAAaction2"
                },
                {
                    "headerName":"AAAaction3"
                },
                {
                    "headerName":"AAAaction4"
                }
            ]
        },
        {
            "task":"BBB",
            "tableHeaders":[
                {
                    "headerName":"BBBaction1"
                },
                {
                    "headerName":"BBBaction2"
                },
                {
                    "headerName":"BBBaction3"
                },
                {
                    "headerName":"BBBaction4"
                }
            ]
        },
        {
            "task":"CCC",
            "tableHeaders":[
                {
                    "headerName":"CCCaction1"
                },
                {
                    "headerName":"CCCaction2"
                },
                {
                    "headerName":"CCCaction3"
                },
                {
                    "headerName":"CCCaction4"
                }
            ]
        },
        {
            "task":"DDD",
            "tableHeaders":[
                {
                    "headerName":"DDDaction1"
                },
                {
                    "headerName":"DDDaction2"
                },
                {
                    "headerName":"DDDaction3"
                },
                {
                    "headerName":"DDDaction4"
                }
            ]
        },
        {
            "task":"EEE",
            "tableHeaders":[
                {
                    "headerName":"EEEaction1"
                },
                {
                    "headerName":"EEEaction2"
                },
                {
                    "headerName":"EEEaction3"
                },
                {
                    "headerName":"EEEaction4"
                }
            ]
        }
    ]
  public subTasks = [
      {
          "subTask":"aaa"
      },
      {
          "subTask":"bbb"
      },
      {
          "subTask":"ccc"
      },
      {
          "subTask":"ddd"
      },
      {
          "subTask":"eee"
      }
  ]

  ngOnInit() {
    this.taskObject.dropdownList = this.getSubTaskList();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  /**Arraging subtask list according to the multi select box */
  getSubTaskList(){
    var dropList = [];
    this.subTasks.map((val,key)=>{
      if(val){
        dropList.push({
          'id':key+1,
          'label':val.subTask
        });
      }
    });
    return dropList;
  }

  /**On item select of sub task */
  onItemSelect(item: any) {
    this.mainSelectedItems = JSON.parse(JSON.stringify(this.selectedItems));
  }

  /**On all items select of sub task */
  onSelectAll(items: any) {
    this.mainSelectedItems = JSON.parse(JSON.stringify(this.selectedItems));
  }
  
  /**On item de-select of sub task */
  onItemDeSelect(item:any){

  }

  /**On All items de-select of sub task */
  onItemDeSelectAll(item:any){
    
  }
  /**Select main task */
  selectTask(){
    if(this.taskObject.selectedTask){
      this.taskObject.showHideSubTasksList = true;
      var index = this.tasks.findIndex(val=>val.task == this.taskObject.selectedTask);
      this.taskObject.headers = this.tasks[index].tableHeaders;
    }
  }

  /**Showing inputs table */
  getInputs(){
    this.taskObject.showHideTableInputs = true;
  }

  /**save Task */
  saveTask(lists){
    var createdTaskList = {};
    createdTaskList['task'] = this.taskObject.selectedTask;
    createdTaskList['subTask'] = [];
    if(lists){
      this.selectedItems.map((v)=>{
      var inputArr = [];
      Object.keys(lists).map((val,key)=>{
        var subTask = val.split("_")[0];
        if(v && v.label && v.label == subTask){
          inputArr.push({'inputValue':lists[val]});;
          }
      });
        createdTaskList['subTask'].push({
          'subTaskName':v.label,
          'values' : inputArr 
        });
      });
      console.log('Final Task List=========>',createdTaskList);
      this.finalCreatedTaskList = createdTaskList;
    }
  }

  /**Deleting task */
  deleteTask(index){
    if(index>=0){
      this.mainSelectedItems.splice(index,1);  
      this.obj = {};    
    }
  }
}
