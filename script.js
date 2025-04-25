const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1ZM_eN_XKNl4YFvVzJpbNgZlJjUbrx3qtlVqagKLcHkE/edit?pli=1&gid=0#gid=0:csv';
fetch(SHEET_CSV_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split('\n').map(row => row.split(','));
    const thead = document.querySelector('#scoreboard thead');
    const tbody = document.querySelector('#scoreboard tbody');

    // 헤더
    const headerRow = document.createElement('tr');
    rows[0].forEach(cell => {
      const th = document.createElement('th');
      th.textContent = cell;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // 본문
    rows.slice(1).forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error('Error fetching Google Sheet:', err);
  });
