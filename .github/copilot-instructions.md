# AI Coding Agent Instructions for Product Data Explorer Backend

## Architecture Overview
This is a NestJS backend application for a product data explorer, using TypeORM with PostgreSQL. The app follows NestJS modular architecture with separate modules for different domains.

- **Modules**: Each feature area (e.g., navigation) has its own module containing controller, service, and entity files
- **Data Flow**: Controllers → Services → TypeORM Repositories
- **Database**: PostgreSQL with auto-loaded entities and synchronization enabled in development

## Key Files and Structure
- `src/app.module.ts`: Root module with TypeORM configuration (hardcoded dev credentials)
- `src/main.ts`: Bootstrap with default NestJS setup, listens on PORT env var or 3000
- `src/navigation/`: Example module with Navigation entity (id, title, slug, last_scraped_at)
- Modules follow pattern: `{feature}.module.ts`, `{feature}.controller.ts`, `{feature}.service.ts`, `{feature}.entity.ts`

## Development Workflows
- **Start dev server**: `npm run start:dev` (watch mode)
- **Build**: `npm run build` (outputs to `dist/`)
- **Test**: `npm run test` (unit), `npm run test:e2e` (end-to-end)
- **Lint**: `npm run lint` (ESLint with Prettier, auto-fix enabled)
- **Format**: `npm run format` (Prettier on src/ and test/ files)

## Coding Patterns
- **Entities**: Use TypeORM decorators (`@Entity`, `@Column`, `@PrimaryGeneratedColumn`, `@Index`)
- **Services**: Inject repositories with `@InjectRepository`, use `this.repo.save()` for inserts/updates, `this.repo.find()` for queries
- **Controllers**: Standard REST decorators (`@Get`, `@Post`), body validation not yet implemented
- **Modules**: Import `TypeOrmModule.forFeature([Entity])` for entity registration
- **Imports**: Use relative paths within src/, no path mapping configured

## Database Configuration
- Host: localhost:5432
- Database: postgres
- Username/Password: postgres/08051999 (development only)
- `synchronize: true` - schema auto-updates from entities
- `autoLoadEntities: true` - entities loaded automatically

## Testing
- Unit tests in `*.spec.ts` files alongside source
- E2E tests in `test/` directory
- Jest configuration in `package.json`
- Mock modules for isolated testing

## Dependencies
- NestJS core packages (@nestjs/common, @nestjs/core, etc.)
- TypeORM for ORM
- pg for PostgreSQL driver
- Standard dev tools: ESLint, Prettier, Jest, TypeScript

## Notes
- TypeScript strict mode partially enabled (null checks on, some others off)
- ESLint allows `@typescript-eslint/no-explicit-any`
- Console logs may appear in module files for debugging
- No environment variables used yet - hardcoded config except PORT for server port</content>
<parameter name="filePath">d:\world of books\product-data-explorer\.github\copilot-instructions.md