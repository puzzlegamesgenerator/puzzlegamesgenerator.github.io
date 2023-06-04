// Function to generate input fields based on user inputs
function generateInputs() {
    const categoryCountInput = document.getElementById('categoryCountInput');
    const elementCountInput = document.getElementById('elementCountInput');
    const inputsContainer = document.getElementById('inputsContainer');
    const generatePuzzleBtn = document.getElementById('generatePuzzleButton');
    const downloadImageBtn = document.getElementById('downloadImageBtn');

    const categoryCount = parseInt(categoryCountInput.value);
    const elementCount = parseInt(elementCountInput.value);

    if (isNaN(categoryCount) || isNaN(elementCount) || categoryCount < 1 || elementCount < 1) {
        inputsContainer.innerHTML = '<p class="text-danger">Please enter valid numbers for the category count and element count.</p>';
        generatePuzzleBtn.classList.add('d-none');
        downloadImageBtn.classList.add('d-none');
        return;
    }

    let inputsHTML = '';

    for (let i = 0; i < categoryCount; i++) {
        inputsHTML += `
            <div class="form-group row category">
                <label for="categoryNameInput${i + 1}" class="col-sm-2 col-form-label">Category ${i + 1} Name:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="categoryNameInput${i + 1}" placeholder="Enter the category name">
                </div>
            </div>
        `;

        for (let j = 0; j < elementCount; j++) {
            inputsHTML += `
                <div class="form-group row">
                    <label for="categoryElementInput${i + 1}-${j + 1}" class="col-sm-2 col-form-label">Category ${i + 1} Element ${j + 1}:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="categoryElementInput${i + 1}-${j + 1}" placeholder="Enter the category element">
                    </div>
                </div>
            `;
        }

        if (i !== categoryCount - 1) {
            inputsHTML += `
                <div class="form-group row"></div>
            `;
        }
    }

    inputsContainer.innerHTML = inputsHTML;
    generatePuzzleBtn.classList.remove('d-none');
    downloadImageBtn.classList.remove('d-none');
}

// Event listener for the "Generate Inputs" button
const generateInputsBtn = document.getElementById('generateInputsBtn');
generateInputsBtn.addEventListener('click', generateInputs);

function generatePuzzle() {
    // Retrieve user inputs
    const categoryCountInput = document.getElementById('categoryCountInput');
    const elementCountInput = document.getElementById('elementCountInput');
    const inputsContainer = document.getElementById('inputsContainer');
    const puzzleGrid = document.getElementById('puzzleGrid');

    const categoryCount = parseInt(categoryCountInput.value);
    const elementCount = parseInt(elementCountInput.value);

    if (isNaN(categoryCount) || isNaN(elementCount) || categoryCount < 1 || elementCount < 1) {
        puzzleGrid.innerHTML = '<p class="text-danger">Please enter valid numbers for the category count and element count.</p>';
        return;
    }

    // Generate the grid
    const grid = [];
    for (let i = 0; i < categoryCount; i++) {
        grid[i] = [];
        for (let j = 0; j < elementCount; j++) {
            grid[i][j] = false; // Initialize all positions as unoccupied
        }
    }

    // Generate the grid HTML
    let gridHTML = '<table class="grid-table">';
    gridHTML += '<tbody>';

    // Generate the column headers
    gridHTML += '<tr>';
    gridHTML += '<th></th>';
    gridHTML += '<th></th>';

    for (let i = 1; i < categoryCount; i++) {
        gridHTML += `<th colspan="${elementCount}" class="column-title-category">Category ${i}</th>`;
    }

    gridHTML += '</tr>';

    // Generate the element headers
    gridHTML += '<tr>';
    gridHTML += '<th></th>';
    gridHTML += '<th></th>';

    for (let i = 1; i < categoryCount; i++) {
        for (let j = 1; j <= elementCount; j++) {
            gridHTML += `<th class="column-title-element vertical-text">Category ${i} Element ${j}</th>`;
        }
    }

    gridHTML += '</tr>';

    // Generate the rows
    for (let i = categoryCount; i > 1; i--) {
        gridHTML += '<tr>';

        gridHTML += `<th rowspan="${categoryCount}" class="row-title-category vertical-text">Category ${i}</th>`;

        for (let j = 1; j <= elementCount; j++) {

            // Add the element to the grid HTML
            gridHTML += `<th class="row-title-element">Category ${i} Element ${j}</th>`;
            gridHTML += `<td></td>`.repeat((i - 1) * elementCount);
            gridHTML += '</tr><tr>';
        }

        gridHTML += '</tr>';
    }

    gridHTML += '</tbody>';
    gridHTML += '</table>';

    puzzleGrid.innerHTML = gridHTML;
}

// Event listener for the "Generate Puzzle" button
const generatePuzzleBtn = document.getElementById('generatePuzzleButton');
generatePuzzleBtn.addEventListener('click', generatePuzzle);

function downloadimage() {
    /*var container = document.getElementById("image-wrap");*/
    /*specific element on page*/
    var container = document.getElementById("puzzleGrid");; /* full page */
    html2canvas(container, {
        allowTaint: true
    }).then(function(canvas) {

        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "html_image.jpg";
        link.href = canvas.toDataURL();
        link.target = '_blank';
        link.click();
    });
}

// Event listener for the "Add Your Own Background" button
const backgroundImageInput = document.getElementById('backgroundImageInput');
backgroundImageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const puzzleGrid = document.getElementById('puzzleGrid');
        puzzleGrid.style.backgroundImage = `url(${e.target.result})`;
    };

    reader.readAsDataURL(file);
});

// Event listener for theme radio buttons
const lightThemeRadio = document.getElementById('lightThemeRadio');
const darkThemeRadio = document.getElementById('darkThemeRadio');

lightThemeRadio.addEventListener('change', function() {
    document.body.classList.remove('theme-dark');
});

darkThemeRadio.addEventListener('change', function() {
    document.body.classList.add('theme-dark');
});