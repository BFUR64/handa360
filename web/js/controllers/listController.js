export function initListListeners() {
    console.log('Initializing list listeners...');
    
    // Function to setup checklist listeners
    function setupChecklistListeners() {
        const checklistToggles = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('#checklist-toggle'));
        const checklistBlocks = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('.checklist-block'));
        
        console.log('Found checklist toggles:', checklistToggles.length);
        console.log('Found checklist blocks:', checklistBlocks.length);
        
        if (checklistToggles.length > 0 && checklistBlocks.length > 0) {
            // Setup each checklist toggle
            checklistToggles.forEach((toggle, index) => {
                const block = checklistBlocks[index];
                if (toggle && block) {
                    toggle.addEventListener('click', function (e) {
                        e.preventDefault();
                        console.log('Checklist toggle clicked!', index);
                        block.classList.toggle('dropdown-open');
                        console.log('Dropdown-open class added:', block.classList.contains('dropdown-open'));
                    });
                }
            });
        } else {
            console.log('Checklist elements not found, retrying in 500ms...');
            setTimeout(setupChecklistListeners, 500);
        }
    }
    
    // Initial setup
    setupChecklistListeners();

function setupContactListListeners() {
        const contactListToggles = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('#contactlist-toggle'));
        const contactListBlocks = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll('.contactlist-block'));
        
        console.log('Found contact list toggles:', contactListToggles.length);
        console.log('Found contact list blocks:', contactListBlocks.length);
        
        if (contactListToggles.length > 0 && contactListBlocks.length > 0) {
            // Setup each checklist toggle
            contactListToggles.forEach((toggle, index) => {
                const block = contactListBlocks[index];
                if (toggle && block) {
                    toggle.addEventListener('click', function (e) {
                        e.preventDefault();
                        console.log('Checklist toggle clicked!', index);
                        block.classList.toggle('dropdown-open');
                        console.log('Dropdown-open class added:', block.classList.contains('dropdown-open'));
                    });
                }
            });
        } else {
            console.log('Contact list elements not found, retrying in 500ms...');
            setTimeout(setupContactListListeners, 500);
        }
    }
    

    setupContactListListeners();

}
