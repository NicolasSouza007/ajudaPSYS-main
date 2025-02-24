document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const categoriesContainer = document.getElementById('categories');

    const categoryPages = [
        'cadastros.html',
        'Financeiro.html',
        'Estoque.html',
        'empresa.html',
        'Faturamento.html',
        'Fiscal.html'
    ];

    function loadCategories() {
        categoryPages.forEach(page => {
            fetch(page)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    const categories = doc.querySelectorAll('.category');
                    categories.forEach(category => {
                        const clonedCategory = category.cloneNode(true);
                        clonedCategory.classList.add('loaded-category');
                        clonedCategory.style.display = 'none'; // Oculta inicialmente
                        categoriesContainer.appendChild(clonedCategory);
                    });
                })
                .catch(error => console.error('Erro ao carregar categorias:', error));
        });
    }

    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const categoryLinks = categoriesContainer.getElementsByClassName('category');
        for (let i = 0; i < categoryLinks.length; i++) {
            const category = categoryLinks[i];
            const text = category.textContent || category.innerText;
            if (filter === '') {
                if (category.classList.contains('original-category')) {
                    category.style.display = ''; // Mostra categorias originais
                } else {
                    category.style.display = 'none'; // Oculta categorias carregadas
                }
            } else {
                if (text.toLowerCase().indexOf(filter) > -1) {
                    category.style.display = ''; // Mostra se corresponder à pesquisa
                } else {
                    category.style.display = 'none'; // Oculta se não corresponder à pesquisa
                }
            }
        }
    });

    loadCategories();
});