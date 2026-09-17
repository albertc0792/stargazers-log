const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00`));

const formatStars = (stars) => new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
}).format(stars);

const renderRepositories = (repositories) => {
  repositoryCount.textContent = `${repositories.length} ${repositories.length === 1 ? 'repository' : 'repositories'}`;
  repositoryList.innerHTML = repositories.map((repository) => `
    <article class="repository">
      <div>
        <a class="repository-name" href="${repository.url}" target="_blank" rel="noreferrer">${repository.repository}</a>
        <p class="repository-description">${repository.description}</p>
        <p class="repository-meta">
          <span>${repository.language}</span>
          <span>${formatStars(repository.stars)} stars</span>
        </p>
      </div>
      <time class="star-date" datetime="${repository.starredAt}">Starred ${formatDate(repository.starredAt)}</time>
    </article>
  `).join('');
};

const loadRepositories = async () => {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    repositoryList.innerHTML = '<p class="status error">Repositories could not be loaded. Please try again later.</p>';
    console.error(error);
  }
};

loadRepositories();