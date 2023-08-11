document.addEventListener('DOMContentLoaded', function () {
    const leaveRows = document.querySelectorAll('.employee-row');
    const searchInput = document.getElementById('searchInput');
    const leaveFilter = document.getElementById('leaveFilter');

    function applyFilters() {
        const selectedType = leaveFilter.value.toLowerCase();
        const searchText = searchInput.value.trim().toLowerCase();

        leaveRows.forEach(function (row) {
            const typeCell = row.querySelector('.leave-type');
            const leaveType = typeCell.textContent.toLowerCase();
            const name = row.querySelector('.leave-name').textContent.toLowerCase();

            const leaveFilterMatch = selectedType === 'all' || leaveType === selectedType;
            const searchFilterMatch = name.includes(searchText)

            if (leaveFilterMatch && searchFilterMatch) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }

    leaveFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Initial filter application
    applyFilters();
});