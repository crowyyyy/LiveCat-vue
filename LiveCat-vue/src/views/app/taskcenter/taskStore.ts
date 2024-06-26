import { defineStore } from "pinia";
import { Task } from "./taskTypes"
import { Monitor } from "./monitorTypes"
import { stopTask,startMonitor,stopMonitor,allMonitors } from "@/api/creeperApi";
import { useSnackbarStore } from "@/stores/snackbarStore";

const snackbarStore = useSnackbarStore();

export const useTaskStore = defineStore({
  id: "task",
  state:()=>({
    taskList: [],
    loading: ref(true),
    labels:[
      {
        id: "running",
        title: "Running",
        icon:"mdi mdi-bug-play-outline",
        color: "green",
      },
      {
        id: "already",
        title: "Already",
        icon:"mdi mdi-bug-stop-outline",
        color: "yellow",
      },
      {
        id: "finish",
        title: "Finish",
        icon:"mdi mdi-bug-check-outline",
        color: "red"
      },
      {
        id: "empty",
        title: "No Status",
        icon: "mdi mdi-radiobox-blank",
        color: "grey"
      },
    ],
    monitors: ref(new Map())
  }),

  getters:{
    getMonitors(){
      return this.monitors
    },
    getAllList(){
      return this.taskList
    },

    getLabelPluginList(){
      // if(this.currentLabel == "running"){
      //   return this.getStartList();
      // }else if(this.currentLable == "close"){
      //   return this.getCloseList();
      // }else if(this.currentLable == "autoStart"){
      //   return this.getAutoStartList()
      // }
    },

  },

  actions:{
     stopTask(task:Task){
       stopTask(task.taskId).then(res=>{
         if (res.data["stop"]) {
            task.status = "finish"
            this.monitors.delete(task.taskId)
            snackbarStore.showSuccessMessage("关闭爬虫任务"+task.taskId+"成功");
         }else{
            snackbarStore.showErrorMessage("无法关闭爬虫任务"+task.taskId);
         }
       })
     },
    startMonitor(task:Task){
        startMonitor(task.taskId).then(res=>{
          if(res.code=="200"){
            task.hasMonitor = 1
            const monitor = res.data["monitor"] as Monitor
            this.monitors.set(monitor.taskId,monitor)
            snackbarStore.showSuccessMessage("开启爬虫任务"+task.taskId+"监视器成功");
          }else{
            snackbarStore.showErrorMessage("该爬虫任务"+task.taskId+"监视器不存在")
          }
        })
     },
    stopMonitor(task:Task){
       stopMonitor(task.taskId).then(res=>{
         if(res.data["stop"]){
           task.hasMonitor = 0
           snackbarStore.showSuccessMessage("关闭爬虫任务"+task.taskId+"监视器成功");
         }else{
           snackbarStore.showErrorMessage("该任务"+task.taskId+"监控器无法暂停");
         }
       })
    }
  }
})
