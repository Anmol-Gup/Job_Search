const open = document.querySelector('ion-icon[name="menu"]');
const close = document.querySelector('ion-icon[name="close"]')
const cards = document.querySelector('.cards')
const heading=document.querySelector('.heading')
const next=document.querySelector('#next')
const previous=document.querySelector('#previous')

let currentPage=0;
let jobPerPage=5;
let totalJobs=0;

heading.onclick=()=>{
    location.href='index.html'
}

open.addEventListener('click', (event) => {
    document.querySelector('header').classList.add('active')
})

close.addEventListener('click', (event) => {
    document.querySelector('header').classList.remove('active')
})

const createCard = (job) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', job._id)

    const card_content = document.createElement('div')
    card_content.classList.add('card_content')

    const h5 = document.createElement('h5')
    h5.innerHTML = job.company

    const role = document.createElement('p')
    role.innerHTML = job.role

    const link = document.createElement('a')
    link.href = job.url
    link.innerHTML = 'Apply Now'
    link.target='_blank'

    cards.appendChild(card);
    card.appendChild(card_content);
    card_content.appendChild(h5);
    card_content.appendChild(role);
    card_content.appendChild(link);
}

const getnextjobs=async()=>{
    try {
        if(currentPage===0)
        {
            previous.disabled=true
            previous.style.color='#fff'
            previous.style.background='#929397'
            previous.style.cursor='none' 
            previous.style.border='none'  
        }
        currentPage++;
        let url=`https://job-api-plum.vercel.app/getjobs/job/?page=${currentPage}&limit=${jobPerPage}`
        const jobs = await fetch(url)
        const result = await jobs.json()
        totalJobs=result.totaljobs

        if((currentPage*jobPerPage)<totalJobs){
            next.disabled=false
            next.style.color='#000'
            next.style.background='#fff'
            next.style.cursor='pointer'
            next.style.border='1px solid #212529'
        }
        else{
            next.disabled=true
            next.style.color='#fff'
            next.style.border='none'
            next.style.background='#929397'
            next.style.cursor='none'
            
            if(currentPage>1)
            {
                previous.disabled=false;
                previous.style.color='#000'
                previous.style.border='1px solid #212529'
                previous.style.background='#fff'
                previous.style.cursor='pointer'
            }
        }

        cards.innerHTML=''
        result.jobs.forEach(element => {
            createCard(element)
        });
    }
    catch (error) {
        console.log(error)
    }
}
const getpreviousjobs=async()=>{
    try {
        currentPage--;
        let url=`https://job-api-plum.vercel.app/getjobs/job/?page=${currentPage}&limit=${jobPerPage}`
        if(currentPage>1)
        {   
            previous.style.cursor='pointer'
            previous.style.color='#000'
            previous.disabled=false
            previous.style.border='1px solid #212529'
            previous.style.background='#fff'
        }
        else{
            previous.disabled=true
            previous.style.border='none'
            previous.style.color='#fff'
            previous.style.background='#929397'
            previous.style.cursor='none'

            if(currentPage<(totalJobs/jobPerPage)){
                next.disabled=false;
                next.style.color='#000'
                next.style.background='#fff'
                next.style.border='1px solid #212529'
                next.style.cursor='pointer'
            }
        }

        const jobs = await fetch(url)
        const result = await jobs.json();

        cards.innerHTML=''
        result.jobs.forEach(element => {
            createCard(element)
        });
    }
    catch (error) {
        console.log(error)
    }
}
window.onload = () => {
    // getjobs();
    getnextjobs();
}
