// All Features JS
function openFeatures(){
    var allElems = document.querySelectorAll('.elem');
    var FullElemsPage = document.querySelectorAll('.fullElements')
    var allFullElemsBackBtn = document.querySelectorAll('.fullElements .back')

    allElems.forEach(function(elem){
        elem.addEventListener('click', function(){
            FullElemsPage[elem.id].style.display = 'block';
        })
    })

    allFullElemsBackBtn.forEach(function(back){
        back.addEventListener('click',function(){
            FullElemsPage[back.id].style.display = 'none';
        })
    })
}
openFeatures();


// To Do List JS
function ToDoList(){
    let form = document.querySelector('.addTask form');
    var currentTask = []
    if(localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'));
    }
    else {
        console.log('Task list is Empty.');
    }

    function renderTask(){
        var allTask = document.querySelector('.allTask')
        var sum = '';
        currentTask.forEach(function(elem,idx){
            sum = sum + `<div class='task'>
                <details>
                    <summary>
                        <h5>${elem.task}<span class=${elem.imp}>Imp</span></h5>
                    </summary>
                    <p>${elem.details}</p>
                </details>
                <button id=${idx}>Mark as Completed</button>
            </div>`
        })
        allTask.innerHTML = sum;
        localStorage.setItem('currentTask', JSON.stringify(currentTask)) ;
    }
    renderTask();


    let taskInput = document.querySelector('.addTask form #task-input');
    let taskDetailsInput = document.querySelector('.addTask form textarea');
    let taskCheckBox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function(e){
        e.preventDefault();
        if(taskInput.value == '' || taskDetailsInput.value == ''){
            alert('Please enter a task and description');
            return;
        }
        currentTask.push(
        {
            task: taskInput.value, 
            details: taskDetailsInput.value, 
            imp: taskCheckBox.checked
        })
        renderTask();
        location.reload();
    })

    //Mark as completed button 
    var markCompletedBtn = document.querySelectorAll('.task button');
    markCompletedBtn.forEach(function(btn){
        btn.addEventListener('click',function(){
            currentTask.splice(btn.id, 1);
            renderTask();
            location.reload();
        })
    })  
}
ToDoList();
 

// Daily Planner JS
function DailyPlanner(){
    var wholeDaySum = '';
    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};
    var hours = Array.from({length: 24},(elem, idx) =>`${0 + idx}:00 - ${1 + idx}:00`);
    hours.forEach(function(elem, idx){
        var savedData = dayPlanData[idx] || '';
        wholeDaySum = wholeDaySum + `<div class='day-planner-time'>
        <p>${elem}</p>
        <input id=${idx} type='text' placeholder='...' value='${savedData}'>
        </div>`
    })

    var dayPlanner =  document.querySelector('.day-planner');
    dayPlanner.innerHTML = wholeDaySum;

    var dayPlannerInput = document.querySelectorAll('.day-planner input');
    dayPlannerInput.forEach(function(elem){
        elem.addEventListener('input',function(){
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
        })
    })
}
DailyPlanner();


// Motivation
function motivationalQuote(){
    let motivationQuote = document.querySelector('.motivation2 h1');
    let motivationAuthor = document.querySelector('.motivation3 h2');
    async function fetchQuote(){
        let response = await fetch('https://dummyjson.com/quotes/random');
        let data = await response.json();
        console.log(data.author);
        motivationQuote.innerHTML = data.quote;
        motivationAuthor.innerHTML = data.author;
    }
    fetchQuote();
}
motivationalQuote();



function PomodoroTimer(){
    let timer = document.querySelector('.pomo-timer h1');
    let startBtn = document.querySelector('.start-timer');
    let pauseBtn = document.querySelector('.pause-timer');
    let resetBtn = document.querySelector('.reset-timer');
    let sessionType = document.querySelector('.session');
    let Timerinterval = null;
    let isWorkSession = true;

    let totalSecond = 25*60;
    // Logic behind update timer. Total Time decreases every second
    function updateTimer(){
        let minutes = Math.floor(totalSecond / 60);
        let seconds = totalSecond % 60;
        timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    // Updates Timer every second
    function startTimer(){
        clearInterval(Timerinterval);
        Timerinterval = setInterval(function(){
            if(totalSecond > 0){
                totalSecond--;
                updateTimer();
            } else {
                // Switch sessions automatically
                isWorkSession = !isWorkSession;
                if(isWorkSession){
                    totalSecond = 25 * 60;
                    sessionType.innerHTML = 'Work Session';
                    sessionType.style.backgroundColor = 'var(--green)';
                } else {
                    totalSecond = 5 * 60;
                    sessionType.innerHTML = 'Break Session';
                    sessionType.style.backgroundColor = 'var(--blue)';
                }
                updateTimer();
            }
        }, 1000);
    }
    startBtn.addEventListener('click', startTimer);

    // Pause Timer
    function pauseTimer(){
        clearInterval(Timerinterval);
    }
    pauseBtn.addEventListener('click', pauseTimer);

    // Reset Timer
    function resetTimer(){
        totalSecond = 25*60;
        clearInterval(Timerinterval);
        updateTimer();
    }
    resetBtn.addEventListener('click', resetTimer);
}
PomodoroTimer();