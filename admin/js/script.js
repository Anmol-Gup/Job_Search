const tbody=document.querySelector('tbody')
const heading=document.querySelector('.heading')
let currentPage=0;
let jobPerPage=10;
let totalJobs=0;

heading.onclick=()=>{
    location.href='index.html'
}

const getjobs = async () => {
    try {
        const jobs = await fetch('http://localhost:3000/getjobs')
        const result = await jobs.json();
        result.forEach((element) => {
            createRow(element)
        });
    }
    catch (error) {
        console.error(error)
    }
}
const requestOptions = {
    method: 'DELETE', // HTTP method
    headers: {
        'Content-Type': 'application/json'
    }
};
const deletejob=async(id)=>{
    try{
        const data=await fetch(`http://localhost:3000/deletejob/${id}`,requestOptions)
        const result=data.json()
        // console.log(result)
        const btn=document.getElementById(id)
        const parent_row=btn.parentElement.parentElement;
        parent_row.remove()
        
    }catch(err){
        console.error(err)
    }
}
const createRow=(job)=>{
    const tr=document.createElement('tr');

    const company=document.createElement('td')
    company.innerHTML=job.company

    const role=document.createElement('td')
    role.innerHTML=job.role

    const location=document.createElement('td')
    location.innerHTML=job.location || 'NA'

    const url=document.createElement('td')
    const a=document.createElement('a')
    a.href=job.url
    a.innerHTML="Apply Link"
    url.appendChild(a);

    const btn=document.createElement('td')
    const deletebtn=document.createElement('button')
    deletebtn.innerHTML='Delete'
    deletebtn.setAttribute('id',job._id)
    deletebtn.onclick=()=>deletejob(job._id)
    btn.append(deletebtn)

    tr.appendChild(company)
    tr.appendChild(role)
    tr.appendChild(location)
    tr.appendChild(url)
    tr.appendChild(btn)

    tbody.append(tr)
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
        let url=`http://localhost:3000/getjobs/job/?page=${currentPage}&limit=${jobPerPage}`
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

        tbody.innerHTML=''
        result.jobs.forEach(element => {
            createRow(element)
        });
    }
    catch (error) {
        console.log(error)
    }
}
const getpreviousjobs=async()=>{
    try {
        currentPage--;
        let url=`http://localhost:3000/getjobs/job/?page=${currentPage}&limit=${jobPerPage}`
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

        tbody.innerHTML=''
        result.jobs.forEach(element => {
            createRow(element)
        });
    }
    catch (error) {
        console.log(error)
    }
}
window.onload = () => {
    getnextjobs();
}