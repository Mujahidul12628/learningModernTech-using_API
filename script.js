
const loadAllData = () => {

    const spinner = document.querySelector('.spinner-border');
    spinner.classList.add('d-block');


    url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)

        .then(response => response.json())

        .then(allData => {
            spinner.classList.remove('d-block');
            displayItemData(allData.data.tools)
        })

        .catch(error => {
            spinner.classList.remove('d-block');
            console.log('error:' + error)
        })

}

const displayItemData = (dataItem) => {

    const itemContainer = document.getElementById('mainContainer')

    for (item of dataItem.slice(0, 6)) {
        const singleItem = document.createElement('div');
        singleItem.classList.add('col');
        singleItem.innerHTML = `
        <div class="card h-100 p-3 uiItemClass">
                        <img src="${item.image}" class="card-img-top rounded-3" alt="..." height="40%">
                        <div class="card-body">
                            <h4 class="card-title">Features</h4>
                           
                            <ol class="card-text">
                                <li>${item.features[0]}</li>
                                <li>${item.features[1]}</li>
                                <li>${item.features[2] ? item.features[2] : 'Data not found'}</li>
                            </ol>
                            <hr>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h5 class="card-title mb-2">${item.name}</h5>
                                    <p class="card-text mt-1">                          
                                    <i class="fa-sharp fa-solid fa-calendar-week"></i>
                                    ${item.published_in}</p>
                                </div>

                                <button onclick="loadNextButton('${item.id}')" type="button" class="btn btn-link" data-bs-toggle="modal"
                                    data-bs-target="#itemDetails"><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
        `
        itemContainer.appendChild(singleItem);

    }

}
// Functionality under the sorting button
document.getElementById('sortByDate').addEventListener
    ('click', function () {

        const sortAllData = () => {
            const spinner = document.querySelector('.spinner-border');
            spinner.classList.add('d-block');

            const itemContainer = document.getElementById('mainContainer');
            itemContainer.innerHTML = '';

            url = 'https://openapi.programming-hero.com/api/ai/tools'
            fetch(url)
                .then(response => response.json())

                .then(allData => {
                    spinner.classList.remove('d-block');
                    const sortedData = allData.data.tools.sort((a, b) =>
                        new Date(b.published_in) - new Date(a.published_in));
                    displayItemData(sortedData);
                })

                .catch(error => {
                    spinner.classList.remove('d-block');
                    console.log('error:' + error)
                })
        }

        const displayItemData = (dataItem) => {

            // const btnSeeMore = document.getElementById('btnSeeMore');
            // btnSeeMore.style.display = 'none';

            document.getElementById('btnSeeMore').style.display = 'none';

            const itemContainer = document.getElementById('mainContainer')

            for (item of dataItem.slice(0, 12)) {
                const singleItem = document.createElement('div');
                singleItem.classList.add('col');
                singleItem.innerHTML = `
            <div class="card h-100 p-3 uiItemClass">
                            <img src="${item.image}" class="card-img-top rounded-3" alt="..." height="40%">
                            <div class="card-body">
                                <h4 class="card-title">Features</h4>
                               
                                <ol class="card-text">
                                    <li>${item.features[0]}</li>
                                    <li>${item.features[1]}</li>
                                    <li>${item.features[2] ? item.features[2] : 'Data not found'}</li>
                                </ol>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h5 class="card-title mb-2">${item.name}</h5>
                                        <p class="card-text mt-1">                          
                                        <i class="fa-sharp fa-solid fa-calendar-week"></i>
                                        ${item.published_in}</p>
                                    </div>
    
                                    <button onclick="loadNextButton('${item.id}')" type="button" class="btn btn-link" data-bs-toggle="modal"
                                        data-bs-target="#itemDetails"><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
            `
                itemContainer.appendChild(singleItem);

            }

        }

        sortAllData();
    })



document.getElementById('btnSeeMore').addEventListener('click', function () {
    btnSeeMore.style.visibility = 'hidden';

    const restAllData = () => {
        url = 'https://openapi.programming-hero.com/api/ai/tools'
        fetch(url)
            .then(response => response.json())
            .then(allData => displayRestItemData(allData.data.tools))
            .catch(error => { console.log('error:' + error) })
    }


    const displayRestItemData = (dataItem) => {

        const itemContainer = document.getElementById('mainContainer')

        for (item of dataItem.slice(6, 12)) {

            const singleItem = document.createElement('div');
            singleItem.classList.add('col');
            singleItem.innerHTML = `
            <div class="card h-100 p-3 uiItemClass">
                            <img src="${item.image ? item.image : ''}" class="card-img-top rounded-3" alt="..." height="40%">
                            <div class="card-body">
                                <h4 class="card-title">Features</h4>
                                <ol class="card-text">
                                    <li>${item.features[0]}</li>
                                    <li>${item.features[1]}</li>
                                    <li>${item.features[2] ? item.features[2] : 'Data not found'}</li>
                                </ol>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h5 class="card-title mb-2">${item.name}</h5>
                                        <p class="card-text my-1">                    
                                        <i class="fa-sharp fa-solid fa-calendar-week"></i>
                                        ${item.published_in}</p>
                                    </div>
                                    <button onclick="loadRestNextButton('${item.id}')" type="button" class="btn btn-link" data-bs-toggle="modal"
                                    data-bs-target="#itemDetails"><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
            `
            itemContainer.appendChild(singleItem);
        }
    }

    restAllData();

})

const loadNextButton = (ID) => {

    url = `https://openapi.programming-hero.com/api/ai/tool/${ID}`
    fetch(url)
        .then(response => response.json())
        .then(detailsData => displayLoadNextButton(detailsData.data));

}
const displayLoadNextButton = (dData) => {

    const modalBody = document.getElementById('modalBodyId');
    modalBody.classList.add('modal-body')
    modalBody.innerHTML = `
                            <div class="bg-danger-subtle mx-3 p-3 border border-danger-subtle border-2 shadow-lg  rounded">
                            <h6 class="text-start">${dData.description}
                            </h6>
                            <div class=" d-flex flex-column text-center text-sm-start flex-sm-row justify-content-between my-3 ">
                            
                            <div class="shadow bg-body-tertiary rounded p-3 m-2 text-success fw-bold">
                            ${dData.pricing ? dData.pricing[0].price ? dData.pricing[0].price.includes('$') ? dData.pricing[0].price : 'Free of Cost/Basic' : 'Free of Cost/Basic' : 'Free of Cost/Basic'}                                  
                            </div>

                            <div class="shadow bg-body-tertiary rounded text-center p-3 m-2 text-warning fw-bold">
                            ${dData.pricing ? dData.pricing[1].price ? dData.pricing[1].price.includes('$') ? dData.pricing[1].price : 'Free of Cost/Pro' : 'Free of Cost/Pro' : 'Free of Cost/Pro'}
                            </div>

                            <div class="shadow bg-body-tertiary rounded p-3 m-2 text-danger fw-bold">
                            ${dData.pricing ? dData.pricing[2].price ? dData.pricing[2].price.includes('$') ? dData.pricing[2].price : 'Free of Cost/Enterprise' : 'Free of Cost/Enterprise' : 'Free of Cost/Enterprise'}
                            </div>

                            </div>
                            <div class=" d-flex flex-column flex-sm-row justify-content-between">
                                <div>
                                    <h6>Features</h6>
                                    <ul id="modalFeatures">
                                    <li class="fs-6 featuresText">${dData.features['1'].feature_name}</li>
                                    <li class="fs-6">${dData.features['2'].feature_name}</li>
                                    <li class="fs-6">${dData.features['3'].feature_name}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h6>Intigration</h6>
                                    <ul id="modalFeatures">
                                    <li class="fs-6">${dData.integrations ? dData.integrations[0] ? dData.integrations[0] : 'No Data Found' : 'No Data Found'} </li>
                                    <li class="fs-6">${dData.integrations ? dData.integrations[1] ? dData.integrations[1] : 'No Data Found' : 'No Data Found'} </li>
                                    <li class="fs-6">${dData.integrations ? dData.integrations[2] ? dData.integrations[2] : 'No Data Found' : 'No Data Found'} </li>
                                    </ul>

                                </div>
                            </div>

                             </div>

                             
                            <div
                            class="bg-success-subtle mx-3 p-3 border border-success-subtle border-2 shadow-lg  rounded">
                            <div class="position-relative">
                            <img class="z-0 rounded-2 img-fluid w-100 mb-3" 
                                src="${dData.image_link[0] ? dData.image_link[0] : 'empty data'}"
                                alt=""> 
                            <div class="position-absolute top-0 end-0  text-center -m-5">


                                <h5 class="text-white bg-danger opacity-75  px-2 py-1 top-0 m-0 " style="display: ${dData.accuracy.score ? 'block' : 'none'}">
                                Accuracy: ${dData.accuracy.score ? dData.accuracy.score + '%' : ''}
                                </h5>
                                
                            </div>
                        </div>
                                

                        <h5 class="my-2 mb-3">${dData.input_output_examples[0].input ? dData.input_output_examples[0].input : 'Data not found'}</h5>
                        <p>${dData.input_output_examples[0].output ?
            dData.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                        </div>
    
    `

}

const loadRestNextButton = (ID) => {

    console.log(ID);

    url = `https://openapi.programming-hero.com/api/ai/tool/${ID}`
    fetch(url)
        .then(response => response.json())
        .then(detailsData => displayLoadRestNextButton(detailsData.data));

}
const displayLoadRestNextButton = (dData) => {
    console.log(dData);


    const modalBody = document.getElementById('modalBodyId');
    modalBody.classList.add('modal-body')
    modalBody.innerHTML = `
                            <div class="bg-danger-subtle mx-3 p-3 border border-danger-subtle border-2 shadow-lg  rounded">
                            <h6 class="text-start">${dData.description}
                            </h6>
                            <div class=" d-flex flex-column text-center text-sm-start flex-sm-row justify-content-between my-3 ">
                                <div class="shadow bg-body-tertiary rounded p-3 m-2 text-success fw-bold">
                                ${dData.pricing ? dData.pricing[0].price ? dData.pricing[0].price.includes('$') ? dData.pricing[0].price : 'Free of Cost/Basic' : 'Free of Cost/Basic' : 'Free of Cost/Basic'}                                  
                                </div>
                                <div class="shadow bg-body-tertiary rounded text-center p-3 m-2 text-warning fw-bold">
                                ${dData.pricing ? dData.pricing[1].price ? dData.pricing[1].price.includes('$') ? dData.pricing[1].price : 'Free of Cost/Pro' : 'Free of Cost/Pro' : 'Free of Cost/Pro'}
                                </div>
                                <div class="shadow bg-body-tertiary rounded p-3 m-2 text-danger fw-bold">
                                ${dData.pricing ? dData.pricing[2].price ? dData.pricing[2].price.includes('$') ? dData.pricing[2].price : 'Free of Cost/Enterprise' : 'Free of Cost/Enterprise' : 'Free of Cost/Enterprise'}
                                </div>
                            </div>
                            <div class=" d-flex flex-column flex-sm-row justify-content-between">
                                <div class="">
                                    <h6>Features</h6>
                                    <ul id="modalFeatures">
                                    <li class="fs-6">
                                    ${dData.features['1'].feature_name ? dData.features['1'].feature_name : 'No Data Found'}</li>
                                    <li class="fs-6">
                                    ${dData.features['2'].feature_name ? dData.features['2'].feature_name : 'No Data Found'}</li>
                                    <li class="fs-6">
                                    ${dData.features['3'].feature_name ? dData.features['3'].feature_name : 'No Data Found'}</li>
                                    
                                    </ul>
                                </div>
                                <div>
                                    <h6>Intigration</h6>
                                    <ul id="modalFeatures">
                                    <li class="fs-6">${dData.integrations ? dData.integrations[0] ? dData.integrations[0] : 'No Data Found' : 'No Data Found'} </li>
                                    <li class="fs-6">${dData.integrations ? dData.integrations[1] ? dData.integrations[1] : 'No Data Found' : 'No Data Found'}</li>
                                    <li class="fs-6">${dData.integrations ? dData.integrations[2] ? dData.integrations[2] : 'No Data Found' : 'No Data Found'} </li>
                                    </ul>
        
                                </div>
                            </div>

                             </div>

                            <div class="bg-success-subtle mx-3 p-3 border border-success-subtle border-2 shadow-lg  rounded">
                            
                           
                            <div class="position-relative">
                            <img class="z-0 rounded-2 img-fluid w-100 h-75 mb-3" 
                                src="${dData.image_link[0] ? dData.image_link[0] : 'No Data Found'}"
                                alt=""> 
                            <div class="position-absolute top-0 end-0 text-center">


                                <h5 class="text-white bg-danger opacity-75  px-2 py-1 top-0 m-0 " style="display: ${dData.accuracy.score ? 'block' : 'none'}">
                                Accuracy: ${dData.accuracy.score ? dData.accuracy.score + '%' : ''}
                                </h5>
                                
                            </div>
                        </div>

                            <h5 class="my-2 mb-3">${dData.input_output_examples ? [0].input ? dData.input_output_examples[0].input : 'Data not found' : 'Data not found'}</h5>
                            <p>${dData.input_output_examples ? [0].output ?
            dData.input_output_examples[0].output : dData.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
                        </div>
    
    `
    console.log(dData.integrations[0])
    console.log(dData.integrations[1])
    console.log(dData.integrations[2])
}

loadAllData();