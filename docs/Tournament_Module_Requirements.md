# **Project Requirements Document: TourneyPro **
TourneyPro is a dynamic and feature-rich multi-sports platform designed to revolutionize the landscape of sports organization in Malaysia. Tailored for tournament organizers, TourneyPro serves as an all-in-one solution that offers an intuitive platform that streamlines the planning and execution of diverse sporting events.

The following table outlines the detailed functional requirements of TourneyPro.

### 🛠️ Phase 1: Tournament Creation Module

| Requirement ID | Description                     | User Story                                                                                       | Expected Behavior/Outcome                                                                                                                                         |
|----------------|---------------------------------|--------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TC-001         | Tournament List View            | As a tournament organizer, I want to see a list of all my created tournaments.                  | Paginated table of tournaments with actions: View, Edit, Copy URL. Supports search, filtering, column visibility toggle, and "Create Tournament" button.         |
| TC-002         | Tournament Creation Form        | As a tournament organizer, I want to create a new tournament by entering key details.           | Form captures title, description, periods, location, public toggle, type, and thumbnail. Proceeds to next step when completed.                                   |
| TC-003         | Rules and Match Settings        | As a tournament organizer, I want to define match rules and settings.                           | Form includes dropdowns and toggles for points, sets, grade period, spin serve, and deuce settings. Defaults are pre-filled and configurable.                   |
| TC-004         | Event Configuration             | As a tournament organizer, I want to define specific events within a tournament.                | Allows adding multiple events with event type, level, age group, prize, and fee. Validates each event entry.                                                    |
| TC-005         | Publish Tournament              | As a tournament organizer, I want to review and publish my tournament.                          | Shows summary view of the tournament configuration. Publishes tournament and makes it publicly accessible with a shareable link.                                |

---

### 🔄 Phase 2: Tournament Management Module

| Requirement ID | Description                     | User Story                                                                                       | Expected Behavior/Outcome                                                                                                                                         |
|----------------|---------------------------------|--------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TM-001         | Player Registration Form        | As a player, I want to register for a tournament and pay the fee.                               | Players fill out registration form and pay. Registration is marked complete once payment is confirmed.                                                          |
| TM-002         | Player Management               | As an organizer, I want to view and manage player registrations.                                | Organizer dashboard shows list of registered players by event. Organizer can add, edit, or delete entries manually.                                              |
| TM-003         | Seeding & Ranking               | As an organizer, I want players to be seeded randomly.                                          | Once registration closes, system auto-generates seeding per event: 1st, 2nd, and 3rd/4th seeds.                                                                  |
| TM-004         | Draw Generator                  | As a participant or organizer, I want to view the tournament draw.                              | Draws generated based on event type (elimination or round robin). Visual bracket view with rounds and player matchups.                                           |
| TM-005         | Match Scheduling System         | As an organizer, I want matches scheduled efficiently.                                           | System assigns match times, dates, and court numbers. Organizer can override schedule manually.                                                                  |
| TM-006         | Winner Management               | As a user, I want to see the winners of each event.                                              | After the tournament ends, displays winners per event (Champion, Runner-up, and 3rd place if applicable).                                                       |
