# InTheGym Design System

## Design Philosophy
InTheGym is designed with exhausted users in mind. Every interaction is optimized for users who are in the middle of an intense workout. This means:
- Large, easily tappable areas
- Clear visual hierarchy
- High contrast for readability
- Minimal cognitive load
Note that this doesn't apply to Edit mode. We assume the users will create and edit workouts when they are not working out.

## Color System
- Primary: iOS Blue (#007AFF) - Used for primary actions and key UI elements
- Text: Dynamic colors that adapt to system theme
  - Primary text: System default
  - Secondary text: Lower contrast for supporting information
- Backgrounds:
  - Primary background: System theme aware
  - Card background: Slightly elevated from primary background
  - Overlay: Semi-transparent black for modals and popups

## Typography
- Primary text: System default, 16px
- Headers: System default, bold, various sizes
- Action labels: 16px, 600 weight, 2px letter spacing
- Supporting text: System default, slightly smaller size

## Components

### Next Button
The next button is designed for maximum usability during workouts:
- Full-width pressable area at the bottom of the screen
- Visual indicator centered in the pressable area
- Clean circular button design with play-skip-forward icon
- "NEXT" label for clear affordance
- Size: 120x120px circular button within a full-width container

### PopupDialog
Modals and dialogs follow these principles:
- Clear error handling with user-friendly messages
- High contrast text for readability
- Semi-transparent overlay background
- Consistent button styling
- Proper spacing for touch targets

## Spacing
- Standard vertical spacing: 16px
- Touch targets: Minimum 44x44px
- Content padding: 16px
- Modal margins: 32px

## Interaction Design
- Large touch targets for workout conditions
- Clear visual feedback on all interactions
- Simple, predictable navigation patterns
- Error states that are easy to understand and recover from

## Accessibility
- System theme aware (light/dark mode support)
- High contrast text and icons
- Large touch targets
- Clear visual hierarchy

## Future Considerations
- Consider haptic feedback for button presses
- Evaluate the need for sound feedback
- Monitor user behavior for areas needing larger touch targets
- Consider adding voice control for hands-free operation during workouts 

## Firebase Implementation

### Authentication
- Uses Firebase Authentication with multiple sign-in methods:
  - Anonymous authentication for quick access
  - Email/password authentication for registered users
- Persistent authentication state using AsyncStorage
- Custom error handling with user-friendly messages
- Auth state management through React hooks (useAuth)

### Data Structure
- Firestore database organization:
  - Root collection: `user`
  - Per-user subcollection: `workout`
  - Each workout is a separate document containing exercise data

### Data Operations
- Read operations:
  - Loading workouts through `loadHome` function
  - Real-time auth state monitoring
- Write operations:
  - Workout updates through `updateWorkout` function
  - Document creation/updates using `setDoc`
  - Automatic workout deletion when navigating back from empty workouts
    - Improves UX by cleaning up without explicit delete action
    - Implemented in EditWorkoutScreen using `beforeRemove` navigation handler
    - Uses `deleteDoc` to remove the workout document from Firestore

### Error Handling
- Comprehensive error handling with specific error codes
- User-friendly error messages for common scenarios:
  - Authentication errors (invalid credentials, disabled accounts)
  - Network-related issues
  - Permission errors
- Consistent error logging for debugging

### Security Considerations
- Authentication state persistence with React Native AsyncStorage
- Protected database paths using user IDs
- Error messages designed to avoid exposing sensitive information 