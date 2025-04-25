const SHEET_JSON_URL = "https://docs.google.com/spreadsheets/d/1ZM_eN_XKNl4YFvVzJpbNgZlJjUbrx3qtlVqagKLcHkE/gviz/tq?tqx=out:json";

fetch(SHEET_JSON_URL)
  .then(response => response.text())
  .then(text => {
    // JSON 부분만 파싱
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const table = json.table;

    const thead = document.querySelector('#scoreboard thead');
    const tbody = document.querySelector('#scoreboard tbody');

    // 테이블 헤더 만들기
    const headerRow = document.createElement('tr');
    table.cols.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col.label;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // 데이터 행 만들기
    table.rows.forEach(row => {
      const tr = document.createElement('tr');
      row.c.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell ? cell.v : '';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing sheet data:', error);
  });
