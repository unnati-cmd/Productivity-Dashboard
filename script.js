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


// Pomodoro Timer
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


// Weather JS
function weather(){
    let data = null;
    var header1Date = document.querySelector('.header1 h1');
    var header1Datee = document.querySelector('.header1 h2')
    let header2Temp = document.querySelector('.header2 h2');
    let header2condition = document.querySelector('.header2 h3');
    let header2pressure = document.querySelector('.header2 h6');
    let header2humidity = document.querySelector('.header2 h4');
    let header2wind = document.querySelector('.header2 h5');


    async function weatherAPICall(){
        let city = 'Delhi';
        let apiKey = `962608d1af53e7a43cb70f33f9f4ca11`;
        let response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        let data = await response.json();
        console.log(data);

        header2Temp.innerHTML = `${data.main.temp} °C`;
        header2condition.innerHTML = data.weather[0].main;
        header2pressure.innerHTML = `Pressure: ${data.main.pressure}`;
        header2humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
        header2wind.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;


    }
    weatherAPICall();
    function timeDate(){
        const totaldaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const totalMonthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var date = new Date();
        header1Datee.innerHTML = `${date.getDate()} ${totalMonthsOfYear[date.getMonth()]} ${date.getFullYear()}`;
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var daysOfWeek = totaldaysOfWeek[date.getDay()];
        if(hours > 12){
            header1Date.innerHTML = `${daysOfWeek}, ${(hours - 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} PM`;
        } else {
            header1Date.innerHTML = `${daysOfWeek}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} AM`;
        }
    }
    setInterval(()=>{
        timeDate();
    },1000);
}
weather();


// Theme toggle
function themeToggle(){
    var theme = document.querySelector('.theme');
    var rootElement = document.documentElement;
    theme.addEventListener('click', function(){
        if (theme.classList.contains('day')) {
            // Switch to night theme
            theme.classList.remove('day');
            theme.classList.add('night');
            rootElement.style.setProperty('--pri', '#ffffff');  // white text
            rootElement.style.setProperty('--sec', '#1a1a1a');   // dark background
            rootElement.style.setProperty('--tri1', '#4a90e2');  // blue accent
            rootElement.style.setProperty('--tri2', '#2c3e50');  // dark gray accent
        } else {
            // Switch to day theme
            theme.classList.remove('night');
            theme.classList.add('day');
            rootElement.style.setProperty('--pri', '#2c3e50');   // dark text
            rootElement.style.setProperty('--sec', '#f8f9fa');   // light gray background
            rootElement.style.setProperty('--tri1', '#4a90e2');  // blue accent
            rootElement.style.setProperty('--tri2', '#e9ecef');  // light accent
        }
    })
}
themeToggle();


// Daily Goals
function DailyGoals(){
    let form = document.querySelector('.formdiv form');
    let mindTask = JSON.parse(localStorage.getItem('mindTask')) || [];
    let bodyTask = JSON.parse(localStorage.getItem('bodyTask')) || [];
    let workTask = JSON.parse(localStorage.getItem('workTask')) || [];
    let otherTask = JSON.parse(localStorage.getItem('otherTask')) || [];

    const MindTask = document.querySelector('#mind-item');
    const BodyTask = document.querySelector('#body-item');
    const WorkTask = document.querySelector('#work-item');
    const OtherTask = document.querySelector('#other-item');
    const goalsContainer = document.querySelector('.goalsdiv');

    function renderTask(){
        let sumMind = '';
        let sumBody = '';
        let sumWork = '';
        let sumOther = '';

        mindTask.forEach(function(elem, idx){
            sumMind += `<div class='type'>
                <details>
                    <summary>
                        <h6>${elem.task}</h6>
                    </summary>
                    <p>${elem.details}</p>
                </details>
                <button data-type='mind' data-index='${idx}'>Mark</button>
            </div>`;
        });
        MindTask.innerHTML = sumMind;

        bodyTask.forEach(function(elem, idx){
            sumBody += `<div class='type'>
                <details>
                    <summary>
                        <h6>${elem.task}</h6>
                    </summary>
                    <p>${elem.details}</p>
                </details>
                <button data-type='body' data-index='${idx}'>Mark</button>
            </div>`;
        });
        BodyTask.innerHTML = sumBody;

        workTask.forEach(function(elem, idx){
            sumWork += `<div class='type'>
                <details>
                    <summary>
                        <h6>${elem.task}</h6>
                    </summary>
                    <p>${elem.details}</p>
                </details>
                <button data-type='work' data-index='${idx}'>Mark</button>
            </div>`;
        });
        WorkTask.innerHTML = sumWork;

        otherTask.forEach(function(elem, idx){
            sumOther += `<div class='type'>
                <details>
                    <summary>
                        <h6>${elem.task}</h6>
                    </summary>
                    <p>${elem.details}</p>
                </details>
                <button data-type='other' data-index='${idx}'>Mark</button>
            </div>`;
        });
        OtherTask.innerHTML = sumOther;

        localStorage.setItem('mindTask', JSON.stringify(mindTask));
        localStorage.setItem('bodyTask', JSON.stringify(bodyTask));
        localStorage.setItem('workTask', JSON.stringify(workTask));
        localStorage.setItem('otherTask', JSON.stringify(otherTask));
    }

    renderTask();

    let taskInput = document.querySelector('#goal-input');
    let taskDetailsInput = document.querySelector('.formdiv form textarea');

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const selectedGoal = document.querySelector('.formdiv form .goals input[name="goal"]:checked');
        if(taskInput.value == '' || taskDetailsInput.value == ''){
            alert('Please enter a task and description');
            return;
        }
        if(!selectedGoal){
            alert('Please select a goal category');
            return;
        }

        const newTask = {
            task: taskInput.value,
            details: taskDetailsInput.value
        };

        if(selectedGoal.id === 'mind') mindTask.push(newTask);
        else if(selectedGoal.id === 'body') bodyTask.push(newTask);
        else if(selectedGoal.id === 'work') workTask.push(newTask);
        else if(selectedGoal.id === 'other') otherTask.push(newTask);

        renderTask();
        form.reset();
    });

    goalsContainer.addEventListener('click', function(e){
        const button = e.target.closest('button[data-type][data-index]');
        if(!button) return;
        const type = button.dataset.type;
        const index = parseInt(button.dataset.index, 10);

        if(type === 'mind') mindTask.splice(index, 1);
        else if(type === 'body') bodyTask.splice(index, 1);
        else if(type === 'work') workTask.splice(index, 1);
        else if(type === 'other') otherTask.splice(index, 1);

        renderTask();
    });
}
DailyGoals();