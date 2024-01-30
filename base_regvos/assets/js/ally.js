const settingsBlock = document.querySelector('#ally-settings');
const triggerAnchors = document.querySelectorAll('.ally a');

const toggleAllyBlockVisibility = () => {
    if (settingsBlock.classList.contains('is-hidden')) {
        settingsBlock.classList.remove('is-hidden');
        settingsBlock.classList.add('is-visible');
        settingsBlock.focus();
        triggerAnchors.forEach(anchor => {
            anchor['ariaLabel'] = 'Закрыть меню настроек доступности'
            anchor['aria-expanded'] = "true";
        })

    } else {
        settingsBlock.classList.add('is-hidden');
        settingsBlock.classList.remove('is-visible');
        triggerAnchors.forEach(anchor => {
            anchor['ariaLabel'] = 'Открыть меню настроек доступности'
            anchor['aria-expanded'] = "false";
        })

    }
}

document.querySelector('#close-ally').addEventListener('click', toggleAllyBlockVisibility);


document.querySelector('.knd-header').addEventListener('click', (e) => {
    if (e.target.closest('.ally a') || e.target.closest('#close-ally')) {
        toggleAllyBlockVisibility();
    }
})