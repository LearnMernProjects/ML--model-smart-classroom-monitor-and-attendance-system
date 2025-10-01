// C:\Users\Viraj Naik\Desktop\EMAH\app\RoleSelectionPage\page.js

// 1. Import the RoleSelectionPage component.
// The path '../../components/RoleSelectionPage' assumes your components 
// folder is two levels up from 'RoleSelectionPage'. Adjust if necessary.
import RoleSelectionPage from '../../components/RoleSelectionPage'; 


// 2. Export the default function that renders the component.
// This is what Next.js expects for a route's main content.
export default function RoleSelectionRoutePage() {
    return (
        // Render the imported component
        <RoleSelectionPage />
    );
}