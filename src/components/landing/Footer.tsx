import ParkPalsLogo from "@/components/ParkPalsLogo";

const footerLinks = {
  Product: ["Features", "Pricing", "Safety", "AI Assistant", "Download"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact", "Community Guidelines", "Bug Report"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <ParkPalsLogo size="md" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Where tails and tales meet. The real-time community app for dog parents and kid parents.
          </p>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-bold text-foreground text-sm mb-4">{title}</h4>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 ParkPals. All rights reserved. Made with 🐾 for park-loving families.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
