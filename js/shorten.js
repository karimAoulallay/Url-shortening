// Shorten Urls

const submitBtn = document.getElementById("submit-btn");
const urlsContainer = document.getElementById("short-url-container");
const inputField = document.getElementById("input-field");
const urlContainer = document.getElementById("short-url-container");

//----------------------------- Click on short button

submitBtn.addEventListener("click", (e) => {
  // Prevent event
  e.preventDefault();

  handler();
});

//----------------------------- Url validation

function urlValidation() {
  return new Promise((resolve, reject) => {
    const url = inputField.value;

    if (new URL(url)) {
      resolve(url);
    } else {
      reject(Error("Invalid input"));
    }
  });
}

//----------------------------- Fetch api

const fetchAPi = async (validUrl) => {
  const response = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${validUrl}`
  );

  const data = await response.json();

  return {
    originUrl: validUrl,
    shortUrl: data.result.short_link,
  };
};

//----------------------------- Create dom element

function createDom(urls) {
  const short = urls.shortUrl;
  const originUrl = urls.originUrl;

  const newElement = document.createElement("div");

  newElement.innerHTML = `
  <div class="bg-neutral rounded-xl p-4 flex flex-col text-[16px]
          md:flex-row md:items-center
          lg:text-[18px]">
            <span class="text-secondaryColor
            md:mr-auto">${originUrl}</span>

            <hr class="md:hidden my-3">

            <span class="text-primaryColor pb-3
            md:pb-0">${short}</span>

            <button id='copy-btn' class="bg-primaryColor text-neutral font-bold rounded-lg py-2 tracking-wider
            md:px-4 md:ml-8">Copy</button>
          </div>`;

  urlContainer.append(newElement);
}

//----------------------------- Copy short url (bubbling method)

document.onclick = (e) => {
  if (e.target.id === "copy-btn") {
    const btn = e.target;
    const short_link = btn.previousElementSibling.innerHTML;

    // reset copy buttons style
    document.querySelectorAll("#copy-btn").forEach((btn) => {
      btn.innerHTML = "Copy";
      btn.classList.remove("bg-secondaryColor");
      btn.classList.add("bg-primaryColor");
    });

    // Styling copy button
    btn.classList.remove("bg-primaryColor");
    btn.classList.add("bg-secondaryColor");
    btn.innerHTML = "Copied!";

    // Copy the link
    navigator.clipboard.writeText(short_link);
  }
};

//----------------------------- Show and hide error message

const inputContainer = document.getElementById("input-container");

function showError() {
  inputContainer.setAttribute("data-error", "true");
}

function hideError() {
  inputContainer.setAttribute("data-error", "false");
}

//----------------------------- Handler

const handler = async () => {
  try {
    const validUrl = await urlValidation();

    const urldata = await fetchAPi(validUrl);

    storedata(urldata);

    createDom(urldata);

    hideError();

    // Clear input
    inputField.value = "";
  } catch (reason) {
    showError();
    console.log(reason);
  }
};

// Store data in session storage

const urlArray = [];

function storedata(urlData) {
  urlArray.push(urlData);

  const data = JSON.stringify(urlArray);

  sessionStorage.setItem("url", data);
}

// backup data

function backUp() {
  if (sessionStorage.getItem("url")) {
    const data = sessionStorage.getItem("url");
    let dataArray = JSON.parse(data);

    dataArray.forEach((url) => {
      createDom(url);
      storedata(url);
    });
  }
}

backUp();
