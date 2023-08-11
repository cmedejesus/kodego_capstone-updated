document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('th');
    const tbody = document.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    headers.forEach((header, index) => {
        header.addEventListener('click', function () {
            rows.sort((a, b) => {
                const aValue = a.children[index].textContent;
                const bValue = b.children[index].textContent;
                return aValue.localeCompare(bValue, undefined, { sensitivity: 'base' });
            });

            if (this.classList.contains('asc')) {
                rows.reverse();
                this.classList.remove('asc');
                this.classList.add('desc');
            } else {
                this.classList.remove('desc');
                this.classList.add('asc');
            }

            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        });
    });
});
