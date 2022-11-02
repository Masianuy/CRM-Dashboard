const menuItem = document.querySelectorAll('.left_item');
menuItem.forEach(item => {
  item.addEventListener('click', function(e) {
    menuItem.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
  })
})

const userName = "Evano";
const userNameClasess = document.querySelectorAll('.user_name');
userNameClasess.forEach(item => {
  item.innerText = userName;
});

const URL_API = 'https://github.com/Masianuy/CRM-Dashboard/blob/main/db.json';
const tbody = document.querySelector('tbody');
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("btn_next");
const prevButton = document.getElementById("btn_prev");
const paginationLimit = 4;


async function getCustomers(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    showCustomers(data);
    const listItems = tbody.querySelectorAll("tr");
    const countOfEntries = document.getElementById('count-of-entries');
    const fromEntries = document.getElementById('from-entrie');
    const toEntries = document.getElementById('to-entrie');
    countOfEntries.innerText = listItems.length;
    const pageCount = Math.ceil(listItems.length / paginationLimit);
    let currentPage = 1;
    const appendPageNumbers = (index) => {
      const pageNumber = document.createElement('button');
      pageNumber.classList.add('pagination-number');
      pageNumber.innerText = index;
      pageNumber.setAttribute('page-index', index);
      pageNumber.setAttribute("aria-label", "Page " + index);
      paginationNumbers.appendChild(pageNumber);
    };
    const getPaginationNumbers = () => {
      for(let i = 1; i <= pageCount; i++) {
        appendPageNumbers(i);
      }
    }
    const handleActivePageNumber = () => {
      document.querySelectorAll('.pagination-number').forEach(btn => {
        btn.classList.remove('active');
        const pageIndex = Number(btn.getAttribute("page-index"));
        if(pageIndex == currentPage) {
          btn.classList.add('active');
        };
      })
    };
    const setCurrentPage = (pageNum) => {
      currentPage = pageNum;
      handleActivePageNumber();
      const prevRange = (pageNum - 1) * paginationLimit;
      const currRange = pageNum * paginationLimit;
      fromEntries.innerText = prevRange + 1;
      toEntries.innerText = currRange;
      listItems.forEach((item, i) => {
        item.classList.add('hidden');
        if(i >= prevRange && i < currRange) {
          item.classList.remove('hidden');
        }
      });
    };
    getPaginationNumbers();
    setCurrentPage(1);
    prevButton.addEventListener('click', () => {
      console.log(setCurrentPage(currentPage - 1));
      setCurrentPage(currentPage - 1);
    });
    nextButton.addEventListener('click', () => {
      console.log(setCurrentPage(currentPage + 1));
      setCurrentPage(currentPage + 1);
    });
    document.querySelectorAll('.pagination-number').forEach((btn) => {
      const pageIndex = Number(btn.getAttribute("page-index"));
      if(pageIndex) {
        btn.addEventListener('click', () => {
          setCurrentPage(pageIndex);
        });
      }
    })
    
  } catch (error) {
    console.log(`HTTP error! status: ${error}`)
  }
};

getCustomers(URL_API);

function showCustomers({customers}) {
  customers.forEach((item) => {
    const tr = document.createElement('tr');
    const name = item.name;
    const company = item.company;
    const phone = item.phone;
    const email = item.email;
    const country = item.country;
    const status = item.status;
    const statusClass = `${status ? 'active' : 'inactive'}`;
    const statusText = `${status ? 'Active' : 'Inactive'}`;
    const userInfo = `<tr>
                <td>${name}</td>
                <td>${company}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${country}</td>
                <td class=${statusClass}>${statusText}</td>
                </tr>`;
    tr.innerHTML = userInfo;
    tbody.appendChild(tr);
  });
};
