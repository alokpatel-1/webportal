import { SidebarOrgConfig, SidebarSection, SidebarUser } from "../../shared/components/sidebar/sidebar.component";

export enum SidebarAction {
    INVITE = 'invite',
    SETTINGS = 'settings',
    CREATE = 'create',
    INVITE_SELLER = 'invite_seller'
}

export enum OrgRole {
    OWNER = 'Owner',
    BRAND = 'Brand',
    ADMIN = 'Admin',
    SELLER = 'Seller'
}

export enum BrandColor {
    PURPLE = 'bg-purple-600',
    TEAL = 'bg-teal-500',
    ORANGE = 'bg-orange-600',
    AMBER = 'bg-amber-600',
    BLUE = 'bg-blue-600',
    TEAL_DARK = 'bg-teal-600',
    ORANGE_BRAND = 'bg-orange-500',
    BLUE_BRAND = 'bg-blue-500'
}

export interface RoleLayoutConfig {
    shopsList: SidebarOrgConfig;
    menuOptions: SidebarSection[];
    user: SidebarUser;
}

export const SUPER_ADMIN_CONFIG: RoleLayoutConfig = {
    shopsList: {
        sectionLabel: 'YOUR ORGANIZATIONS',
        allOrgs: [
            { name: 'PCMBC', role: OrgRole.OWNER, initial: 'P', bgColorClass: BrandColor.PURPLE },
            { name: 'Basaglar', role: OrgRole.BRAND, initial: 'B', bgColorClass: BrandColor.TEAL }
        ],
        mainActions: [
            { label: 'Manage Members', icon: 'pi pi-users', action: SidebarAction.INVITE },
            { label: 'Organization Settings', icon: 'pi pi-cog', action: SidebarAction.SETTINGS }
        ],
        footerAction: { label: 'Create New Organization', icon: 'pi pi-plus', action: SidebarAction.CREATE }
    },
    menuOptions: [
        {
            title: 'Persona',
            items: [
                { label: 'Personas', icon: 'pi pi-user', route: '/super-admin/personas' },
                { label: 'Create Persona', icon: 'pi pi-plus', route: '/super-admin/create-persona' }
            ]
        },
        {
            title: 'Knowledge',
            items: [
                { label: 'Knowledge bases', icon: 'pi pi-book', route: '/super-admin/knowledge-bases' },
                { label: 'Add Knowledge base', icon: 'pi pi-plus', route: '/super-admin/add-knowledge-base' }
            ]
        },
        {
            title: 'Review',
            items: [
                { label: 'Sessions', icon: 'pi pi-hourglass', route: '/super-admin/sessions' },
                { label: 'Start new review', icon: 'pi pi-plus', route: '/super-admin/start-review' }
            ]
        }
    ],
    user: {
        name: 'Alok Patel',
        email: 'alok.patel_demo_4@livo.com',
        initial: 'A',
        bgColorClass: BrandColor.PURPLE
    }
};

export const SHOP_ADMIN_CONFIG: RoleLayoutConfig = {
    shopsList: {
        sectionLabel: 'YOUR ORGANIZATIONS',
        allOrgs: [
            { name: 'Shop HQ', role: OrgRole.ADMIN, initial: 'H', bgColorClass: BrandColor.ORANGE },
            { name: 'Branch East', role: OrgRole.ADMIN, initial: 'E', bgColorClass: BrandColor.AMBER },
            { name: 'Branch West', role: OrgRole.ADMIN, initial: 'W', bgColorClass: BrandColor.AMBER },
            { name: 'Branch North', role: OrgRole.ADMIN, initial: 'N', bgColorClass: BrandColor.AMBER },
            { name: 'Branch South', role: OrgRole.ADMIN, initial: 'S', bgColorClass: BrandColor.AMBER },
            { name: 'Branch South', role: OrgRole.ADMIN, initial: 'S', bgColorClass: BrandColor.AMBER },
            { name: 'Branch South', role: OrgRole.ADMIN, initial: 'S', bgColorClass: BrandColor.AMBER }
        ],
        mainActions: [
            { label: 'Manage Sellers', icon: 'pi pi-users', action: SidebarAction.INVITE },
            { label: 'Organization Settings', icon: 'pi pi-cog', action: SidebarAction.SETTINGS }
        ],
        footerAction: { label: 'Invite new seller', icon: 'pi pi-plus', action: SidebarAction.INVITE_SELLER }
    },
    menuOptions: [
        {
            title: 'Management',
            items: [
                { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/shop-admin' },
                { label: 'Sellers', icon: 'pi pi-users', route: '/shop-admin/sellers' },
                { label: 'Approvals', icon: 'pi pi-check-square', route: '/shop-admin/approvals' }
            ]
        }
    ],
    user: {
        name: 'Admin User',
        email: 'admin@shop.com',
        initial: 'A',
        bgColorClass: BrandColor.ORANGE_BRAND
    }
};

export const SELLER_CONFIG: RoleLayoutConfig = {
    shopsList: {
        sectionLabel: 'YOUR SHOPS',
        allOrgs: [
            { name: 'My Seller Store', role: OrgRole.SELLER, initial: 'S', bgColorClass: BrandColor.BLUE },
            { name: 'Second Store', role: OrgRole.SELLER, initial: 'S', bgColorClass: BrandColor.TEAL_DARK }
        ],
        mainActions: [
            { label: 'Shop Settings', icon: 'pi pi-cog', action: SidebarAction.SETTINGS }
        ],
        footerAction: { label: 'Create New Shop', icon: 'pi pi-plus', action: SidebarAction.CREATE }
    },
    menuOptions: [
        {
            title: 'Main',
            items: [
                { label: 'Dashboard', icon: 'pi pi-home', route: '/seller' },
                { label: 'Orders', icon: 'pi pi-shopping-cart', route: '/seller/orders' },
                { label: 'Products', icon: 'pi pi-tag', route: '/seller/products' }
            ]
        }
    ],
    user: {
        name: 'Seller User',
        email: 'seller@example.com',
        initial: 'S',
        bgColorClass: BrandColor.BLUE_BRAND
    }
};
