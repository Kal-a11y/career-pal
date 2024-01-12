const searchBar = document.querySelector('#job-search-bar');
const searchBtn = document.querySelector('#job-search-button');
let resultList;
if (document.querySelector('#result-list') !== null) {
    resultList = document.querySelector('#result-list').children;
    //Give each result in list id based on name
    Array.from(resultList).forEach(item => {
        const itemTitle = item.children[0].children[1].children[0].textContent;
        item.id = itemTitle.split(' ').join('-');

        item.addEventListener('click', async () => {
            const searchTerm = decodeURIComponent(document.location.pathname.split('/')[2]);

            if (window.innerWidth >= 640) {
                window.location.replace(`/job-search/${searchTerm}/${itemTitle}/false`);

            } else {
                window.location.replace(`/job-search/${searchTerm}/${itemTitle}/true`)
            }
        })
    });
}




searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    //Get search term
    const searchTerm = searchBar.value.trim();

    //See if search has already been made
    const res = await fetch('/job-search', {
        method: 'POST',
        body: JSON.stringify({ searchTerm }),
        headers: { 'Content-Type': 'application/json' },
    })
    const searchData = await res.json()
    if (res.ok) {
        //If there is no history create search
        if (searchData.data === null) {
            const res2 = await fetch('/api/job-search', {
                method: 'POST',
                body: JSON.stringify({ searchTerm }),
                headers: { 'Content-Type': 'application/json' },
            })


            if (res2.ok) {
                window.location.href = (`/job-search/${searchTerm}`);
                
            }

        //Otherwise render the page
        }else{
            window.location.href = '/job-search/' + searchTerm
        }

    }

    // const res = await fetch('/job-search/' + searchTerm);
    // console.log('turning json')
    // const data =  res.json()
    // console.log(data)
    // if (data !== null) {
    //     window.location.replace('/job-search/' + searchTerm)

    // } else {

    //     const res2 = await fetch('/api/job-search', {
    //         method: 'POST',
    //         body: JSON.stringify({ searchTerm }),
    //         headers: { 'Content-Type': 'application/json' },
    //     })


    //     if (res2.ok) {
    //         window.location.replace(`/job-search/ + ${searchTerm}`)
    //         console.log(data)
    //     }
    // }

})
