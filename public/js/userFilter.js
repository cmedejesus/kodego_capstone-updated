document.addEventListener('DOMContentLoaded', function () {
    const userRows = document.querySelectorAll('.user-row');
    const searchInput = document.getElementById('searchInput');
    const roleFilter = document.getElementById('roleFilter');

    function applyFilters() {
        const selectedRole = roleFilter.value.toLowerCase();
        const searchText = searchInput.value.trim().toLowerCase();

        userRows.forEach(function (row) {
            const roleCell = row.querySelector('.user-role');
            const userRole = roleCell.textContent.toLowerCase();
            const firstName = row.querySelector('.user-firstName').textContent.toLowerCase();
            const lastName = row.querySelector('.user-lastName').textContent.toLowerCase();
            const userName = row.querySelector('.user-userName').textContent.toLowerCase();

            const roleFilterMatch = selectedRole === '' || userRole === selectedRole;
            const searchFilterMatch = firstName.includes(searchText) || lastName.includes(searchText) || userName.includes(searchText);

            if (roleFilterMatch && searchFilterMatch) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    }

    roleFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);

    // Initial filter application
    applyFilters();
});