export type Project = {
  id: string;
  title: string;
  projectType: "web" | "design";
  category: string;
  shortDescription: string;
  technologies: string[];
  role: string;
  year: string;
  slug: string;
  imageUrl?: string;
  liveUrl?: string;
  timeline?: string;
  challenge?: string;
  objective?: string;
  process?: string[];
  gridSpan?: string;
};

export const projects: Project[] = [
  {
    "id": "1",
    "title": "School ERP",
    "projectType": "web",
    "category": "Enterprise System",
    "shortDescription": "A unified platform for managing student data, attendance, and campus activities with an intuitive interface.",
    "technologies": [
      "Next.js",
      "PostgreSQL",
      "Tailwind"
    ],
    "role": "Software Developer ",
    "year": "2026",
    "slug": "school-erp",
    "imageUrl": "/projects/school_erp.jpg",
    "liveUrl": "",
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "2",
    "title": "E-Commerce Website",
    "projectType": "web",
    "category": "Web App",
    "shortDescription": "A fully functional modern e-commerce platform with seamless checkout experience.",
    "technologies": [
      "React.js",
      "JavaScript",
      "Tailwind CSS"
    ],
    "role": "Full Stack Developer ",
    "year": "2025",
    "slug": "ecommerce-website",
    "imageUrl": "/projects/ecommerce.jpg",
    "liveUrl": "https://customer-lilac-ten.vercel.app/",
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "3",
    "title": "Parlor Management System",
    "projectType": "web",
    "category": "Web App",
    "shortDescription": "A comprehensive booking and management system tailored for beauty parlors and salons.",
    "technologies": [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js"
    ],
    "role": "Full Stack Developer ",
    "year": "2024",
    "slug": "parlor-management-system",
    "imageUrl": "/projects/parlor.jpg",
    "liveUrl": "",
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "4",
    "title": "Transport Management System",
    "projectType": "web",
    "category": "Web App",
    "shortDescription": "Comprehensive dashboard for tracking and managing logistics and transportation.",
    "technologies": [
      "React.js",
      "JavaScript",
      "Tailwind CSS"
    ],
    "role": "Frontend Developer ",
    "year": "2023",
    "slug": "transport-management-system",
    "imageUrl": "/projects/transport.jpg",
    "liveUrl": "",
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "5",
    "title": "Supermarket Stock Management",
    "projectType": "web",
    "category": "Web App",
    "shortDescription": "Inventory management software with real-time stock updates and reporting.",
    "technologies": [
      "React.js",
      "JavaScript",
      "Tailwind CSS"
    ],
    "role": "Frontend Developer",
    "year": "2023",
    "slug": "supermarket-stock-management",
    "imageUrl": "/projects/stock.jpg",
    "liveUrl": "",
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "6",
    "title": "Employee Management System",
    "projectType": "web",
    "category": "Internal Tool",
    "shortDescription": "A streamlined HR and employee management dashboard for tracking attendance and performance.",
    "technologies": [
      "React",
      "Express",
      "MongoDB"
    ],
    "role": "Full Stack Developer",
    "year": "2026",
    "slug": "employee-management-system",
    "imageUrl": "/projects/employee.jpg",
    "liveUrl": "https://attendance-employee-lovat.vercel.app/",
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "1791034384510",
    "title": "Movie Ticket Booking",
    "projectType": "design",
    "category": "Mobile App Design",
    "shortDescription": "A sleek and intuitive mobile application design for browsing movies and booking tickets seamlessly.",
    "technologies": ["Figma", "Wireframing", "Prototyping"],
    "role": "UI/UX Designer",
    "timeline": "3 Weeks",
    "year": "2024",
    "slug": "movie-ticket-booking",
    "imageUrl": "/projects/movie_booking.jpg",
    "liveUrl": "https://www.figma.com/proto/jeVMrMPx2zu9pkPvCxTdnY/Dharani?node-id=223-30482&viewport=688%2C1085%2C0.19&t=w6alPyct3f0BrFWT-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=223%3A30482&page-id=0%3A1&show-proto-sidebar=1",
    "challenge": "Simplifying the seat selection process and reducing cognitive load during the checkout flow.",
    "objective": "Design a user-friendly and visually appealing ticket booking app that increases conversion rates.",
    "process": ["User Research", "Wireframing", "High-Fidelity UI", "Interactive Prototyping"],
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "1791034658205",
    "title": "Cycle Booking ",
    "projectType": "design",
    "category": "Mobile App Design",
    "shortDescription": "An eco-friendly cycle rental app interface with location tracking and easy unlocking mechanism.",
    "technologies": ["Figma", "User Research", "Interaction Design"],
    "role": "UI/UX Designer",
    "timeline": "4 Weeks",
    "year": "2024",
    "slug": "cycle-booking",
    "imageUrl": "/projects/cycle_booking.jpg",
    "liveUrl": "https://www.figma.com/proto/jeVMrMPx2zu9pkPvCxTdnY/Dharani?node-id=194-4488&viewport=191%2C633%2C0.12&t=DJQ7UNwlQkYoJy2Y-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    "challenge": "Making map navigation and the bike unlocking process clear and frictionless for first-time users.",
    "objective": "Create an engaging and modern UI that promotes eco-friendly transportation.",
    "process": ["Competitive Analysis", "User Flows", "UI Design", "Usability Testing"],
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "1791034915524",
    "title": "Shoe Application ",
    "projectType": "design",
    "category": "E-Commerce App",
    "shortDescription": "A modern sneaker store app design focusing on immersive product displays and quick checkout.",
    "technologies": ["Figma", "Visual Design", "Prototyping"],
    "role": "UI/UX Designer",
    "timeline": "2 Weeks",
    "year": "2023",
    "slug": "shoe-application",
    "imageUrl": "/projects/shoe_app.jpg",
    "liveUrl": "https://www.figma.com/proto/jeVMrMPx2zu9pkPvCxTdnY/Dharani?node-id=263-5368&viewport=191%2C633%2C0.12&t=DJQ7UNwlQkYoJy2Y-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    "challenge": "Presenting high-quality product images without cluttering the screen on smaller devices.",
    "objective": "Build a premium and highly visual shopping experience for sneaker enthusiasts.",
    "process": ["Moodboarding", "Visual Design", "Micro-interactions"],
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    "id": "1791035287977",
    "title": "E-Commerce Website",
    "projectType": "design",
    "category": "Web Design",
    "shortDescription": "A fully responsive web interface for an online fashion retailer with advanced filtering and cart management.",
    "technologies": ["Figma", "Design Systems", "Web Design"],
    "role": "UI/UX Designer",
    "timeline": "1 Month",
    "year": "2023",
    "slug": "e-commerce-website-design",
    "imageUrl": "/projects/ecommerce_design.jpg",
    "liveUrl": "https://www.figma.com/proto/jeVMrMPx2zu9pkPvCxTdnY/Dharani?node-id=231-28667&viewport=1403%2C230%2C0.13&t=pUdupw0hV5r55D2C-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=231%3A28667&page-id=0%3A1",
    "challenge": "Organizing complex product categories and filters while maintaining a clean aesthetic.",
    "objective": "Design an intuitive desktop and mobile web experience to drive online sales.",
    "process": ["Information Architecture", "Wireframing", "Responsive UI Design", "Prototyping"],
    "gridSpan": "col-span-12 md:col-span-6 lg:col-span-4"
  }
];
