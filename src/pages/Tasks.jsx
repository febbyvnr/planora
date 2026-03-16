import { useState, useRef, useEffect } from "react";
import deleteImg from "../assets/images/tasks-delete.png";
import footer from "../assets/images/tasks-footer.png";
import confetti from "canvas-confetti";
import {
    Plus,
    SlidersHorizontal,
    Clock,
    AlertTriangle,
    CheckCircle2,
    CalendarX,
    Calendar,
    MoreHorizontal,
    Pencil,
    Trash2,
    CheckCircle,
    Circle,
    XCircle
} from "lucide-react";

export default function Tasks() {

const agendas = ["Academic Planner","Committee","Design Club"];
const [tasks,setTasks] = useState([
    {
        title:"Calculus Assignment",
        category:"Mathematics",
        priority:"High",
        status:"In Progress",
        agenda:"Academic Planner",
        date:"Mar 24, 2026"
    },
    {
        title:"Biology Lab Report",
        category:"Biology",
        priority:"Medium",
        status:"In Progress",
        agenda:"Academic Planner",
        date:"Mar 12, 2026"
    },
    {
        title:"UX Wireframe Draft",
        category:"Design",
        priority:"Medium",
        status:"In Progress",
        agenda:"Design Club",
        date:"Mar 10, 2026"
    },
    {
        title:"Committee Budget Planning",
        category:"Meeting",
        priority:"Medium",
        status:"In Progress",
        agenda:"Committee",
        date:"Mar 18, 2026"
    },
    {
        title:"Research Proposal Draft",
        category:"Academic",
        priority:"Medium",
        status:"In Progress",
        agenda:"Academic Planner",
        date:"Mar 14, 2026"
    },
    {
        title:"Design Poster Revision",
        category:"Design",
        priority:"Medium",
        status:"In Progress",
        agenda:"Design Club",
        date:"Mar 21, 2026"
    },
    {
        title:"Statistics Homework",
        category:"Academic",
        priority:"Medium",
        status:"In Progress",
        agenda:"Academic Planner",
        date:"Mar 6, 2026"
    },
    {
        title:"Weekly Committee Meeting",
        category:"Meeting",
        priority:"Medium",
        status:"In Progress",
        agenda:"Committee",
        date:"Mar 19, 2026"
    },
    {
        title:"Database Design Task",
        category:"Design",
        priority:"Medium",
        status:"In Progress",
        agenda:"Design Club",
        date:"Mar 22, 2026"
    },
    {
        title:"Literature Review",
        category:"Academic",
        priority:"Medium",
        status:"In Progress",
        agenda:"Academic Planner",
        date:"Mar 8, 2026"
    },
    {
        title:"Design System Update",
        category:"Design",
        priority:"Medium",
        status:"In Progress",
        agenda:"Design Club",
        date:"Mar 27, 2026"
    },
    {
        title:"Committee Documentation",
        category:"Meeting",
        priority:"Medium",
        status:"In Progress",
        agenda:"Committee",
        date:"Mar 29, 2026"
    },
    {
        title:"History Essay Draft",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 2, 2026"
    },
    {
        title:"Psychology Reading",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 3, 2026"
    },
    {
        title:"Design Mockup Review",
        category:"Design",
        priority:"Low",
        status:"Completed",
        agenda:"Design Club",
        date:"Mar 4, 2026"
    },
    {
        title:"Committee Meeting Notes",
        category:"Meeting",
        priority:"Low",
        status:"Completed",
        agenda:"Committee",
        date:"Mar 5, 2026"
    },
    {
        title:"Presentation Slides",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 7, 2026"
    },
    {
        title:"Experiment Data Analysis",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 9, 2026"
    },
    {
        title:"UI Layout Adjustment",
        category:"Design",
        priority:"Low",
        status:"Completed",
        agenda:"Design Club",
        date:"Mar 11, 2026"
    },
    {
        title:"Committee Planning Discussion",
        category:"Meeting",
        priority:"Low",
        status:"Completed",
        agenda:"Committee",
        date:"Mar 13, 2026"
    },
    {
        title:"Project Documentation",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 15, 2026"
    },
    {
        title:"Poster Color Correction",
        category:"Design",
        priority:"Low",
        status:"Completed",
        agenda:"Design Club",
        date:"Mar 16, 2026"
    },
    {
        title:"Committee Review Session",
        category:"Meeting",
        priority:"Low",
        status:"Completed",
        agenda:"Committee",
        date:"Mar 17, 2026"
    },
    {
        title:"Study Group Discussion",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 20, 2026"
    },
    {
        title:"Icon Design Update",
        category:"Design",
        priority:"Low",
        status:"Completed",
        agenda:"Design Club",
        date:"Mar 23, 2026"
    },
    {
        title:"Committee Report Draft",
        category:"Meeting",
        priority:"Low",
        status:"Completed",
        agenda:"Committee",
        date:"Mar 25, 2026"
    },
    {
        title:"Reading Summary",
        category:"Academic",
        priority:"Low",
        status:"Completed",
        agenda:"Academic Planner",
        date:"Mar 26, 2026"
    },
    {
        title:"Brand Guideline Review",
        category:"Design",
        priority:"Low",
        status:"Completed",
        agenda:"Design Club",
        date:"Mar 28, 2026"
    },
    {
        title:"Committee Final Notes",
        category:"Meeting",
        priority:"Low",
        status:"Completed",
        agenda:"Committee",
        date:"Mar 30, 2026"
    },
    {
        title:"Committee Budget Approval",
        category:"Meeting",
        priority:"Medium",
        status:"Overdue",
        agenda:"Committee",
        date:"Feb 10, 2026"
    },
    {
        title:"Poster Submission Deadline",
        category:"Design",
        priority:"Medium",
        status:"Overdue",
        agenda:"Design Club",
        date:"Feb 10, 2026"
    }
]);

const [statusFilter,setStatusFilter]=useState(null);
const [agendaFilter,setAgendaFilter]=useState(null);
const [showAll,setShowAll]=useState(false);
const [openFilter,setOpenFilter]=useState(false);
const filterRef = useRef(null);

useEffect(() => {
    function handleClickOutside(event) {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setOpenFilter(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

const filteredTasks=tasks.filter(task=>{
    if(statusFilter==="High") return task.priority==="High";
    if(statusFilter==="Medium") return task.priority==="Medium";
    if(statusFilter==="Low") return task.priority==="Low";
    if(statusFilter && ["In Progress","Completed","Overdue"].includes(statusFilter))
    if(task.status!==statusFilter) return false;
    if(agendaFilter && task.agenda!==agendaFilter) return false;
    return true;
});

const displayedTasks=showAll?filteredTasks:filteredTasks.slice(0,3);

const agendaColor=(agenda)=>{
    if(agenda==="Academic Planner") return "bg-blue-100 text-blue-600";
    if(agenda==="Committee") return "bg-purple-100 text-purple-600";
    return "bg-yellow-100 text-yellow-700";
};

const priorityColor=(priority)=>{
    if(priority==="High") return "bg-red-100 text-red-500";
    if(priority==="Medium") return "bg-yellow-100 text-yellow-600";
    return "bg-gray-200 text-gray-600";
};

const [showModal,setShowModal] = useState(false);
const [taskTitle,setTaskTitle] = useState("");
const [agenda,setAgenda] = useState("Academic Planner");
const [subject,setSubject] = useState("Mathematics");
const [dueDate,setDueDate] = useState("");
const [priority,setPriority] = useState("Low");
const [tagColor,setTagColor] = useState("#6385E5");
const [editMode,setEditMode] = useState(false);
const [editIndex,setEditIndex] = useState(null);
const [showDeleteModal,setShowDeleteModal] = useState(false);
const [deleteTask,setDeleteTask] = useState(null);
const [toast,setToast] = useState(null);

const showToast = (msg, conf) => {
    setToast(msg);

    if (conf) {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999
        });
    }

    setTimeout(() => {
        setToast(null);
    }, 3000);
};

const colors = [
    "#6385E5",
    "#4C27B2",
    "#009053",
    "#FE5140",
    "#FEC05D",
    "#FB716E",
    "#458CC9"
];

const [openAgenda,setOpenAgenda] = useState(false);
const [openSubject,setOpenSubject] = useState(false);
const [menuIndex,setMenuIndex] = useState(null);

const [agendaList,setAgendaList] = useState([
    "Academic Planner",
    "Committee",
    "Design Club"
]);

const [subjectList,setSubjectList] = useState([
    "Mathematics",
    "Biology",
    "Psychology",
    "History"
]);

const isFormValid =
    taskTitle.trim() !== "" &&
    agenda.trim() !== "" &&
    subject.trim() !== "" &&
    dueDate.trim() !== "";

const getStatusIcon = (task, index) => {

    if (task.status === "Completed") {
        return (
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="text-green-600" size={18}/>
            </div>
        );
    }

    if (task.status === "Overdue") {
        return (
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="text-red-500" size={18}/>
            </div>
        );
    }

    return (
        <button
            onClick={()=>{
                const updated = [...tasks];
                updated[index].status = "Completed";
                setTasks(updated);
                showToast("Task completed!", true);
            }}
            className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-500 transition"
        >
            <Circle size={16}/>
        </button>
    );
};

    return(
        <div className="min-h-screen pt-0">
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Tasks Management
                        </h1>
                        <p className="text-gray-500">
                            Hey Olivia! You have <span className="text-indigo-600 font-semibold">12 tasks</span> waiting for you
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 relative" ref={filterRef}>
                        <button
                            onClick={()=>setOpenFilter(!openFilter)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-xl"
                        >
                            <SlidersHorizontal size={18}/>
                            Filters
                        </button>
                        {openFilter &&(
                            <div className="absolute left-0 md:left-auto md:right-0 top-12 mt-1 bg-white border rounded-xl shadow-lg w-52 z-50">
                                <div className="flex flex-col text-sm">
                                    <button onClick={()=>setStatusFilter("In Progress")} className="px-4 py-2 hover:bg-gray-100">In Progress</button>
                                    <button onClick={()=>setStatusFilter("High")} className="px-4 py-2 hover:bg-gray-100">High Priority</button>
                                    <button onClick={()=>setStatusFilter("Medium")} className="px-4 py-2 hover:bg-gray-100">Medium Priority</button>
                                    <button onClick={()=>setStatusFilter("Low")} className="px-4 py-2 hover:bg-gray-100">Low Priority</button>
                                    <button onClick={()=>setStatusFilter("Completed")} className="px-4 py-2 hover:bg-gray-100">Completed</button>
                                    <button onClick={()=>setStatusFilter("Overdue")} className="px-4 py-2 hover:bg-gray-100">Overdue</button>
                                    <div className="border-t"></div>
                                    <button
                                        onClick={()=>{
                                            setStatusFilter(null);
                                            setAgendaFilter(null);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-100 text-indigo-600"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            </div>  
                        )}
                        <button
                            onClick={()=>{
                                setEditMode(false);
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl"
                        >
                            <Plus size={18}/>
                            New Task
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div
                        className="flex items-center gap-4 p-5 rounded-2xl border border-blue-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        onClick={()=>setStatusFilter("In Progress")}
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock className="text-blue-600"/>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">In Progress</p>
                            <p className="font-bold text-lg">12</p>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-4 p-5 rounded-2xl border border-yellow-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        onClick={()=>setStatusFilter("High")}
                    >
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                            <AlertTriangle className="text-yellow-600"/>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">High Priority</p>
                            <p className="font-bold text-lg">1</p>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-4 p-5 rounded-2xl border border-green-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        onClick={()=>setStatusFilter("Completed")}
                    >
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="text-green-600"/>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Completed</p>
                            <p className="font-bold text-lg">17</p>
                        </div>
                    </div>
                    <div
                        className="flex items-center gap-4 p-5 rounded-2xl border border-red-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        onClick={()=>setStatusFilter("Overdue")}
                    >
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <CalendarX className="text-red-500"/>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Overdue</p>
                            <p className="font-bold text-lg">2</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Active Tasks
                    </h2>
                    <div className="flex gap-3 mb-6 flex-wrap">
                        <button
                            onClick={()=>setAgendaFilter(null)}
                                className={`px-4 py-2 rounded-full text-sm ${
                                agendaFilter===null ? "bg-indigo-600 text-white" : "border"
                            }`}
                        >
                            All Agenda
                        </button>
                        {agendas.map(a=>(
                            <button
                                key={a}
                                onClick={()=>setAgendaFilter(a)}
                                    className={`px-4 py-2 rounded-full text-sm ${
                                    agendaFilter===a ? "bg-indigo-600 text-white" : "border"
                                }`}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                    <div className="bg-white rounded-3xl border divide-y">
                        {displayedTasks.map((task,index)=>(
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-5 relative hover:bg-indigo-50 transition gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    {getStatusIcon(task,index)}
                                    <div>
                                        <p className={`font-semibold text-base sm:text-lg ${
                                            task.status === "Completed" ? "line-through text-gray-400" : ""
                                        }`}>
                                            {task.title}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">
                                                {task.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14}/>
                                                {task.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-6 flex-wrap sm:flex-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${agendaColor(task.agenda)}`}>
                                        {task.agenda}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setMenuIndex(menuIndex === index ? null : index)
                                        }
                                    >
                                        <MoreHorizontal size={18}/>
                                    </button>
                                    {menuIndex === index && (
                                        <div className="absolute right-6 top-14 bg-white border rounded-xl shadow w-32 z-20">
                                            <button
                                                onClick={()=>{
                                                    setMenuIndex(null);
                                                    setEditMode(true);
                                                    setEditIndex(index);
                                                    setShowModal(true);
                                                    setTaskTitle(task.title);
                                                    setAgenda(task.agenda);
                                                    setSubject(task.category);
                                                    setPriority(task.priority);
                                                    setDueDate(task.date);
                                                }}
                                                className="flex gap-2 p-2 text-sm hover:bg-gray-100 w-full"
                                            >
                                                <Pencil size={16}/> Edit
                                            </button>
                                            <button
                                                onClick={()=>{
                                                    setMenuIndex(null);
                                                    setDeleteTask(task);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="flex gap-2 p-2 text-sm text-red-500 hover:bg-red-50 w-full"
                                            >
                                                <Trash2 size={16}/> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    {filteredTasks.length>3 &&(
                        <div
                            onClick={()=>setShowAll(!showAll)}
                            className="text-center py-4 text-indigo-600 text-sm cursor-pointer"
                        >
                            {showAll?"Show Less":"Show More Tasks"}
                        </div>
                    )}
                    </div>
                </div>
                <div className="rounded-[40px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                    <img
                        src={footer}
                        alt="Tasks Footer"
                        className="w-auto h-auto object-cover object-top"
                    />
                </div>
                {showModal && (
                    <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
                        <div className="bg-[#F7F7F7] w-[92%] max-w-[460px] rounded-[28px] p-6 space-y-5 animate-scaleIn shadow-2xl">
                            <h2 className="text-3xl font-bold">
                                {editMode ? "Edit Task" : "Add New Task"}
                            </h2>
                            <div>
                                <p className="text-gray-500 text-sm mb-2">TASK TITLE</p>
                                <input
                                    value={taskTitle}
                                    onChange={(e)=>setTaskTitle(e.target.value)}
                                    placeholder="e.g., Calculus Assignment 5 : Derivatives II"
                                    className="w-full px-4 py-3 rounded-2xl bg-gray-200 focus:bg-white border-2 border-transparent focus:border-indigo-500 outline-none transition"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <p className="text-gray-500 text-sm mb-2">AGENDA</p>
                                    <div
                                        onClick={()=>setOpenAgenda(!openAgenda)}
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-200 cursor-pointer flex items-center justify-between"
                                    >
                                        <span>{agenda}</span>
                                        <span className="text-gray-500 text-lg leading-none">▾</span>
                                    </div>
                                    {openAgenda && (
                                        <div className="absolute w-full bg-white border rounded-xl mt-2 shadow-md z-10">
                                            {agendaList.map(a => (
                                                <div
                                                    key={a}
                                                    onClick={()=>{
                                                        setAgenda(a);
                                                        setOpenAgenda(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {a}
                                                </div>
                                            ))}
                                            <div className="border-t"/>
                                            <input
                                                placeholder="Add new agenda..."
                                                className="w-full px-4 py-2 outline-none rounded-b-xl"
                                                onKeyDown={(e)=>{
                                                    if(e.key==="Enter" && e.target.value){
                                                        setAgendaList([...agendaList,e.target.value]);
                                                        setAgenda(e.target.value);
                                                        setOpenAgenda(false);
                                                        e.target.value="";
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <p className="text-gray-500 text-sm mb-2">SUBJECT</p>
                                    <div
                                        onClick={()=>setOpenSubject(!openSubject)}
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-200 cursor-pointer flex items-center justify-between"
                                    >
                                        {subject}
                                        <span className="text-gray-500 text-lg leading-none">▾</span>
                                    </div>
                                    {openSubject && (
                                        <div className="absolute w-full bg-white border rounded-xl mt-2 shadow-md z-10">
                                            {subjectList.map(s => (
                                                <div
                                                    key={s}
                                                    onClick={()=>{
                                                        setSubject(s);
                                                        setOpenSubject(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {s}
                                                </div>
                                            ))}
                                            <div className="border-t"/>
                                            <input
                                                placeholder="Add new subject..."
                                                className="w-full px-4 py-2 outline-none rounded-b-xl"
                                                onKeyDown={(e)=>{
                                                    if(e.key==="Enter" && e.target.value){
                                                        setSubjectList([...subjectList,e.target.value]);
                                                        setSubject(e.target.value);
                                                        setOpenSubject(false);
                                                        e.target.value="";
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-2">PRIORITY</p>
                                <div className="flex bg-gray-200 rounded-full p-1">
                                    {["Low","Medium","High"].map(p=>(
                                        <button
                                            key={p}
                                            onClick={()=>setPriority(p)}
                                            className={`flex-1 py-2 rounded-full ${
                                            priority===p ? "bg-white text-indigo-600 font-semibold" : ""
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-2">DUE DATE</p>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e)=>setDueDate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl bg-gray-200 focus:bg-white border-2 border-transparent focus:border-indigo-500 outline-none transition"
                                />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-2">CATEGORY TAG</p>
                                <div className="flex gap-4">
                                    {colors.map((c) => (
                                        <div key={c}
                                            onClick={() => setTagColor(c)}
                                            className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center`}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full"
                                                style={{ background: c }}
                                            />
                                            {tagColor === c && (
                                                <div className="absolute w-10 h-10 rounded-full border-4 border-[#C7D2FE]" />
                                            )}
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center">
                                        +
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between pt-6">
                                <button
                                    onClick={()=>{
                                        setShowModal(false);
                                        setEditMode(false);
                                    }}
                                    className="text-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!isFormValid}
                                    onClick={()=>{
                                        if(!isFormValid) return;

                                        if(editMode){
                                            showToast("Task updated successfully!", true);
                                        }else{
                                            showToast("Task created successfully!", true);
                                        }
                                        setShowModal(false);
                                    }}
                                    className={`px-6 py-3 rounded-xl text-white transition ${
                                        isFormValid
                                        ? "bg-indigo-600 hover:bg-indigo-700"
                                        : "bg-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    {editMode ? "Save Changes" : "Create Task"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="bg-white w-[90%] max-w-[420px] rounded-[28px] p-8 text-center">
                            <img
                                src={deleteImg}
                                className="w-28 mx-auto mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-3">
                                Delete this task?
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Are you sure want to remove
                                <br/>
                                <span className="font-semibold text-gray-700">
                                    '{deleteTask?.title}'
                                </span> ?
                                This action cannot be undone and you'll lose your progress
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={()=>setShowDeleteModal(false)}
                                    className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium"
                                >
                                    Keep Task
                                </button>
                                <button
                                    onClick={()=>{
                                        showToast("Task deleted successfully", false);
                                        setShowDeleteModal(false);
                                    }}
                                    className="px-6 py-3 rounded-xl bg-red-500 text-white font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {toast && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
                        <div className="bg-white border shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={20}/>
                            <p className="text-sm font-medium text-gray-700">
                                {toast}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}