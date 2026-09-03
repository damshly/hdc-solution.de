"use client";

import React, { useState, useEffect, useCallback } from "react";

interface ServiceDetail {
  title: string;
  items: string[];
}

interface SubServiceItem {
  id: string;
  slug: string;
  parentId: string;
  title: string;
  shortDesc: string;
  description: string;
  headline: string;
  intro: string;
  tag: string;
  icon?: string;
  image: string;
  features: string[];
  benefits: string[];
  areas?: string[];
  standards?: string[];
}

interface MainServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  headline: string;
  intro: string;
  tag: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  areas?: string[];
  details?: ServiceDetail[];
  subServices: SubServiceItem[];
}

interface AdvantageItem {
  title: string;
  desc: string;
  icon: string;
}

interface SiteConfigData {
  name: string;
  city: string;
  region: string;
  ogImage: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  owner: string;
  street: string;
  zip: string;
  country: string;
  taxId: string;
  workingHours: string;
  address: string;
  fullAddress: string;
  url: string;
  description: string;
  navLinks: Array<{ name: string; href: string }>;
  services: unknown[];
  advantages: AdvantageItem[];
}

interface FaqConfigItem {
  question: string;
  answer: string;
}

interface MediaItem {
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export default function AdminSecretDashboardPage() {
  const [adminSecret, setAdminSecret] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hdc_admin_secret") || "";
    }
    return "";
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"company" | "advantages" | "services" | "faq" | "media" | "json">("company");

  const [siteData, setSiteData] = useState<SiteConfigData | null>(null);
  const [servicesData, setServicesData] = useState<MainServiceItem[]>([]);
  const [faqData, setFaqData] = useState<FaqConfigItem[]>([]);

  const [rawFileSelected, setRawFileSelected] = useState<string>("config/site.json");
  const [rawJsonContent, setRawJsonContent] = useState<string>("");

  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [mediaSearch, setMediaSearch] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  const toggleServiceExpand = (id: string) => {
    setExpandedServices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const loadAllConfigs = useCallback(async (secret: string) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const [siteRes, servicesRes, faqRes] = await Promise.all([
        fetch("/api/admin/config.php?file=config/site.json", { headers: { "x-admin-token": secret } }),
        fetch("/api/admin/config.php?file=config/services.json", { headers: { "x-admin-token": secret } }),
        fetch("/api/admin/config.php?file=config/faq.json", { headers: { "x-admin-token": secret } }),
      ]);

      if (siteRes.status === 401 || servicesRes.status === 401 || faqRes.status === 401) {
        setIsAuthenticated(false);
        setAuthError("Invalid Admin Key. Access denied.");
        setIsLoading(false);
        return false;
      }

      const siteJson = await siteRes.json();
      const servicesJson = await servicesRes.json();
      const faqJson = await faqRes.json();

      if (siteJson.success) setSiteData(siteJson.content);
      if (servicesJson.success) setServicesData(servicesJson.content || []);
      if (faqJson.success) setFaqData(faqJson.content || []);

      setIsAuthenticated(true);
      setAuthError("");
      setHasUnsavedChanges(false);
      sessionStorage.setItem("hdc_admin_secret", secret);
      return true;
    } catch {
      setAuthError("Connection to server failed.");
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMediaList = useCallback(async (secret: string) => {
    try {
      const res = await fetch("/api/admin/upload.php", {
        headers: { "x-admin-token": secret },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMediaList(data.files || []);
      }
    } catch {
      // Ignore network errors on media fetch
    }
  }, []);

  useEffect(() => {
    if (!adminSecret) return;
    let active = true;

    loadAllConfigs(adminSecret).then((success) => {
      if (active && success) {
        loadMediaList(adminSecret);
      }
    });

    return () => {
      active = false;
    };
  }, [adminSecret, loadAllConfigs, loadMediaList]); // <-- هنا المشكلة!

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    await loadAllConfigs(adminSecret);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hdc_admin_secret");
    setIsAuthenticated(false);
    setAdminSecret("");
    setAuthError("");
  };

  const markChanged = () => {
    setHasUnsavedChanges(true);
  };

  const handleSaveAll = async () => {
    if (!adminSecret) return;
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const promises: Promise<Response>[] = [];

      if (siteData) {
        promises.push(
          fetch("/api/admin/config.php", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-admin-token": adminSecret },
            body: JSON.stringify({ filename: "config/site.json", content: siteData }),
          })
        );
      }

      if (servicesData) {
        promises.push(
          fetch("/api/admin/config.php", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-admin-token": adminSecret },
            body: JSON.stringify({ filename: "config/services.json", content: servicesData }),
          })
        );
      }

      if (faqData) {
        promises.push(
          fetch("/api/admin/config.php", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-admin-token": adminSecret },
            body: JSON.stringify({ filename: "config/faq.json", content: faqData }),
          })
        );
      }

      const results = await Promise.all(promises);
      const allSuccess = results.every((res) => res.ok);

      if (allSuccess) {
        setHasUnsavedChanges(false);
        setStatusMessage({ type: "success", text: "All changes saved successfully!" });
      } else {
        setStatusMessage({ type: "error", text: "Failed to save some configuration files." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Error saving data to server." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !adminSecret) return;

    setIsUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload.php", {
        method: "POST",
        headers: { "x-admin-token": adminSecret },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({ type: "success", text: `File ${data.filename} uploaded successfully!` });
        await loadMediaList(adminSecret);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to upload file." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Network error during file upload." });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const updateCompanyField = (key: keyof SiteConfigData, value: unknown) => {
    if (!siteData) return;
    setSiteData({ ...siteData, [key]: value });
    markChanged();
  };

  const updateAdvantage = (index: number, key: keyof AdvantageItem, value: string) => {
    if (!siteData) return;
    const updated = [...siteData.advantages];
    updated[index] = { ...updated[index], [key]: value };
    setSiteData({ ...siteData, advantages: updated });
    markChanged();
  };

  const addAdvantage = () => {
    if (!siteData) return;
    setSiteData({
      ...siteData,
      advantages: [...siteData.advantages, { title: "New Advantage", desc: "Description...", icon: "Sparkles" }],
    });
    markChanged();
  };

  const deleteAdvantage = (index: number) => {
    if (!siteData) return;
    const updated = siteData.advantages.filter((_, i) => i !== index);
    setSiteData({ ...siteData, advantages: updated });
    markChanged();
  };

  const updateService = (sIndex: number, field: keyof MainServiceItem, value: unknown) => {
    const updated = [...servicesData];
    updated[sIndex] = { ...updated[sIndex], [field]: value };
    setServicesData(updated);
    markChanged();
  };

  const addArrayItem = (sIndex: number, field: "features" | "benefits" | "areas", newItem: string) => {
    if (!newItem.trim()) return;
    const updated = [...servicesData];
    const currentList = updated[sIndex][field] || [];
    updated[sIndex] = { ...updated[sIndex], [field]: [...currentList, newItem.trim()] };
    setServicesData(updated);
    markChanged();
  };

  const removeArrayItem = (sIndex: number, field: "features" | "benefits" | "areas", itemIndex: number) => {
    const updated = [...servicesData];
    const currentList = updated[sIndex][field] || [];
    updated[sIndex] = { ...updated[sIndex], [field]: currentList.filter((_, i) => i !== itemIndex) };
    setServicesData(updated);
    markChanged();
  };

  const addMainService = () => {
    const newId = `service-${Date.now()}`;
    const newService: MainServiceItem = {
      id: newId,
      slug: newId,
      title: "New Service",
      shortDesc: "Short service teaser...",
      description: "Full service description...",
      headline: "Headline for Service Detail Page",
      intro: "Introductory text...",
      tag: "New",
      icon: "Sparkles",
      image: "/images/service-1.jpeg",
      features: ["First Feature"],
      benefits: ["First Benefit"],
      areas: ["Target Area 1"],
      subServices: [],
    };
    setServicesData([...servicesData, newService]);
    setExpandedServices((prev) => ({ ...prev, [newId]: true }));
    markChanged();
  };

  const deleteMainService = (sIndex: number) => {
    if (!confirm("Are you sure you want to delete this main service?")) return;
    const updated = servicesData.filter((_, i) => i !== sIndex);
    setServicesData(updated);
    markChanged();
  };

  const addSubService = (sIndex: number) => {
    const parent = servicesData[sIndex];
    const subId = `sub-${Date.now()}`;
    const newSub: SubServiceItem = {
      id: subId,
      slug: subId,
      parentId: parent.id,
      title: "New Sub-Service",
      shortDesc: "Short description...",
      description: "Detailed sub-service description...",
      headline: "Certified Service",
      intro: "Sub-service intro...",
      tag: "Special",
      icon: "CheckCircle",
      image: parent.image || "/images/service-1.jpeg",
      features: ["Special Feature 1"],
      benefits: ["Benefit 1"],
      areas: ["Area 1"],
    };
    const updated = [...servicesData];
    updated[sIndex].subServices = [...(updated[sIndex].subServices || []), newSub];
    setServicesData(updated);
    markChanged();
  };

  const updateSubService = (sIndex: number, subIndex: number, field: keyof SubServiceItem, value: unknown) => {
    const updated = [...servicesData];
    const subList = [...updated[sIndex].subServices];
    subList[subIndex] = { ...subList[subIndex], [field]: value };
    updated[sIndex].subServices = subList;
    setServicesData(updated);
    markChanged();
  };

  const deleteSubService = (sIndex: number, subIndex: number) => {
    const updated = [...servicesData];
    updated[sIndex].subServices = updated[sIndex].subServices.filter((_, i) => i !== subIndex);
    setServicesData(updated);
    markChanged();
  };

  const updateFaq = (fIndex: number, field: keyof FaqConfigItem, value: string) => {
    const updated = [...faqData];
    updated[fIndex] = { ...updated[fIndex], [field]: value };
    setFaqData(updated);
    markChanged();
  };

  const addFaq = () => {
    setFaqData([...faqData, { question: "New Question?", answer: "Enter answer..." }]);
    markChanged();
  };

  const deleteFaq = (fIndex: number) => {
    const updated = faqData.filter((_, i) => i !== fIndex);
    setFaqData(updated);
    markChanged();
  };

  const filteredMedia = mediaList.filter((m) =>
    m.filename.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/10 text-sky-400 mb-4 border border-sky-500/20">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">HDC Admin Dashboard</h1>
            <p className="text-sm text-slate-400 mt-2">Please enter your admin secret key</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Secret Key
              </label>
              <input
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                placeholder="Enter secret key..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs leading-relaxed">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-sky-600/20"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sticky Header Action Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            HDC
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white leading-tight">Admin Dashboard</h1>
              {hasUnsavedChanges && (
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Unsaved Changes
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Content Management System</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveAll}
            disabled={isSaving || isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 shadow-lg ${hasUnsavedChanges
                ? "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30 animate-pulse"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
          >
            {isSaving ? (
              <span>Saving changes...</span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Changes</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-slate-400 hover:text-red-400 px-3 py-2 border border-slate-800 hover:border-red-500/30 rounded-xl transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Tab Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto">
          {[
            { id: "company", label: "Company Info" },
            { id: "advantages", label: "Advantages & Features" },
            { id: "services", label: "Services & Sub-Services" },
            { id: "faq", label: "FAQ" },
            { id: "media", label: "Media Library" },
            { id: "json", label: "Advanced (Raw JSON)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center space-x-2 ${activeTab === tab.id
                  ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-sm flex items-center justify-between border shadow-lg ${statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
          >
            <span>{statusMessage.text}</span>
            <button onClick={() => setStatusMessage(null)} className="text-xs opacity-70 hover:opacity-100">
              Close
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center text-slate-500 text-sm">Loading configuration files...</div>
        ) : (
          <>
            {/* TAB 1: Company Metadata */}
            {activeTab === "company" && siteData && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                    <span>Company Details & Contact Info</span>
                    <span className="text-xs font-mono text-slate-500">config/site.json</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={siteData.name || ""}
                        onChange={(e) => updateCompanyField("name", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        City / Primary Location
                      </label>
                      <input
                        type="text"
                        value={siteData.city || ""}
                        onChange={(e) => updateCompanyField("city", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Service Region
                      </label>
                      <input
                        type="text"
                        value={siteData.region || ""}
                        onChange={(e) => updateCompanyField("region", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={siteData.email || ""}
                        onChange={(e) => updateCompanyField("email", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Phone Number (Calls)
                      </label>
                      <input
                        type="text"
                        value={siteData.phone || ""}
                        onChange={(e) => updateCompanyField("phone", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Formatted Phone Number
                      </label>
                      <input
                        type="text"
                        value={siteData.phoneFormatted || ""}
                        onChange={(e) => updateCompanyField("phoneFormatted", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        WhatsApp Number (Digits Only)
                      </label>
                      <input
                        type="text"
                        value={siteData.whatsappNumber || ""}
                        onChange={(e) => updateCompanyField("whatsappNumber", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Working Hours / Emergency Service
                      </label>
                      <input
                        type="text"
                        value={siteData.workingHours || ""}
                        onChange={(e) => updateCompanyField("workingHours", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Impressum & Legal */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                    Legal & Impressum Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Business Owner
                      </label>
                      <input
                        type="text"
                        value={siteData.owner || ""}
                        onChange={(e) => updateCompanyField("owner", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Street & House Number
                      </label>
                      <input
                        type="text"
                        value={siteData.street || ""}
                        onChange={(e) => updateCompanyField("street", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Postal Code (ZIP)
                      </label>
                      <input
                        type="text"
                        value={siteData.zip || ""}
                        onChange={(e) => updateCompanyField("zip", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Tax ID / Tax Notice
                      </label>
                      <input
                        type="text"
                        value={siteData.taxId || ""}
                        onChange={(e) => updateCompanyField("taxId", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Meta Description (SEO Preview)
                    </label>
                    <textarea
                      value={siteData.description || ""}
                      onChange={(e) => updateCompanyField("description", e.target.value)}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Advantages */}
            {activeTab === "advantages" && siteData && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Advantages & Key Features</h2>
                    <p className="text-xs text-slate-400">Manage primary value propositions displayed on the homepage</p>
                  </div>
                  <button
                    onClick={addAdvantage}
                    className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <span>+ Add Advantage</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {siteData.advantages.map((adv, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 relative group">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                          Advantage #{idx + 1}
                        </span>
                        <button
                          onClick={() => deleteAdvantage(idx)}
                          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={adv.title}
                            onChange={(e) => updateAdvantage(idx, "title", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Icon Name (Lucide)</label>
                          <input
                            type="text"
                            value={adv.icon}
                            onChange={(e) => updateAdvantage(idx, "icon", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500"
                            placeholder="e.g. ShieldCheck, Clock, Sparkles"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                          <textarea
                            value={adv.desc}
                            onChange={(e) => updateAdvantage(idx, "desc", e.target.value)}
                            rows={2}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Services & Detailed Services */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Services & Sub-Services</h2>
                    <p className="text-xs text-slate-400">Manage main services and nested sub-services</p>
                  </div>
                  <button
                    onClick={addMainService}
                    className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <span>+ Add Main Service</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {servicesData.map((service, sIndex) => {
                    const isExpanded = expandedServices[service.id] ?? true;
                    return (
                      <div key={service.id || sIndex} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                        {/* Service Card Header */}
                        <div
                          onClick={() => toggleServiceExpand(service.id)}
                          className="bg-slate-800/60 p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors border-b border-slate-800"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs font-mono">
                              {sIndex + 1}
                            </span>
                            <div>
                              <h3 className="text-base font-bold text-white">{service.title || "Untitled Service"}</h3>
                              <span className="text-xs text-slate-400 font-mono">/leistungen/{service.slug}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="text-xs bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-slate-300">
                              {service.subServices?.length || 0} Sub-Services
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMainService(sIndex);
                              }}
                              className="text-xs text-red-400 hover:text-red-300 px-3 py-1 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Content */}
                        {isExpanded && (
                          <div className="p-6 space-y-6">
                            {/* Main Service Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                                <input
                                  type="text"
                                  value={service.title}
                                  onChange={(e) => updateService(sIndex, "title", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Slug (URL Path)</label>
                                <input
                                  type="text"
                                  value={service.slug}
                                  onChange={(e) => updateService(sIndex, "slug", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Badge Tag</label>
                                <input
                                  type="text"
                                  value={service.tag || ""}
                                  onChange={(e) => updateService(sIndex, "tag", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Icon Name (Lucide)</label>
                                <input
                                  type="text"
                                  value={service.icon || ""}
                                  onChange={(e) => updateService(sIndex, "icon", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL (/images/...)</label>
                                <input
                                  type="text"
                                  value={service.image || ""}
                                  onChange={(e) => updateService(sIndex, "image", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-sky-500"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Main Headline</label>
                                <input
                                  type="text"
                                  value={service.headline || ""}
                                  onChange={(e) => updateService(sIndex, "headline", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Short Description (Teaser)</label>
                                <input
                                  type="text"
                                  value={service.shortDesc || ""}
                                  onChange={(e) => updateService(sIndex, "shortDesc", e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Intro Text</label>
                              <textarea
                                value={service.intro || ""}
                                onChange={(e) => updateService(sIndex, "intro", e.target.value)}
                                rows={2}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-sky-500"
                              />
                            </div>

                            {/* Features List Manager */}
                            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Service Features & Scope</h4>
                              <div className="flex flex-wrap gap-2">
                                {(service.features || []).map((feat, fIdx) => (
                                  <span key={fIdx} className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-200 flex items-center space-x-2">
                                    <span>{feat}</span>
                                    <button
                                      onClick={() => removeArrayItem(sIndex, "features", fIdx)}
                                      className="text-slate-500 hover:text-red-400"
                                    >
                                      &times;
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center space-x-2 pt-2">
                                <input
                                  type="text"
                                  id={`new-feature-${sIndex}`}
                                  placeholder="Type new feature..."
                                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      const input = e.currentTarget;
                                      addArrayItem(sIndex, "features", input.value);
                                      input.value = "";
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    const input = document.getElementById(`new-feature-${sIndex}`) as HTMLInputElement;
                                    if (input) {
                                      addArrayItem(sIndex, "features", input.value);
                                      input.value = "";
                                    }
                                  }}
                                  className="bg-slate-800 hover:bg-slate-700 text-xs font-medium px-3 py-2 rounded-lg text-slate-200"
                                >
                                  Add
                                </button>
                              </div>
                            </div>

                            {/* Sub-Services Nested Cards */}
                            <div className="border-t border-slate-800 pt-6 space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-sm font-bold text-white">Sub-Services ({service.subServices?.length || 0})</h4>
                                  <p className="text-xs text-slate-400">Specialized sub-services for {service.title}</p>
                                </div>
                                <button
                                  onClick={() => addSubService(sIndex)}
                                  className="bg-sky-600/20 hover:bg-sky-600/30 text-sky-400 text-xs font-semibold px-3 py-2 rounded-lg border border-sky-500/30 transition-colors"
                                >
                                  + Add Sub-Service
                                </button>
                              </div>

                              <div className="space-y-4">
                                {(service.subServices || []).map((sub, subIndex) => (
                                  <div key={sub.id || subIndex} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                                      <span className="text-xs font-bold text-slate-300 font-mono">
                                        Sub-Service #{subIndex + 1}: {sub.title}
                                      </span>
                                      <button
                                        onClick={() => deleteSubService(sIndex, subIndex)}
                                        className="text-xs text-slate-500 hover:text-red-400"
                                      >
                                        Delete Sub-Service
                                      </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                                        <input
                                          type="text"
                                          value={sub.title}
                                          onChange={(e) => updateSubService(sIndex, subIndex, "title", e.target.value)}
                                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Slug</label>
                                        <input
                                          type="text"
                                          value={sub.slug}
                                          onChange={(e) => updateSubService(sIndex, subIndex, "slug", e.target.value)}
                                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Image URL</label>
                                        <input
                                          type="text"
                                          value={sub.image}
                                          onChange={(e) => updateSubService(sIndex, subIndex, "image", e.target.value)}
                                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
                                        />
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Short Description</label>
                                      <textarea
                                        value={sub.shortDesc}
                                        onChange={(e) => updateSubService(sIndex, subIndex, "shortDesc", e.target.value)}
                                        rows={2}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: FAQ */}
            {activeTab === "faq" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Frequently Asked Questions (FAQ)</h2>
                    <p className="text-xs text-slate-400">Manage questions and answers for website visitors</p>
                  </div>
                  <button
                    onClick={addFaq}
                    className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <span>+ Add FAQ Item</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {faqData.map((faq, fIdx) => (
                    <div key={fIdx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                          Question #{fIdx + 1}
                        </span>
                        <button
                          onClick={() => deleteFaq(fIdx)}
                          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(fIdx, "question", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Answer</label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFaq(fIdx, "answer", e.target.value)}
                            rows={3}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Media Manager */}
            {activeTab === "media" && (
              <div className="space-y-6">
                {/* Upload Dropzone */}
                <div className="bg-slate-900 border border-dashed border-slate-700 hover:border-sky-500 rounded-2xl p-8 text-center transition-colors relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {isUploading ? "Uploading file..." : "Drop image or file here or click to browse"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Supported formats: JPG, PNG, WEBP, SVG, GIF, PDF (Max 10MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media Search & Grid */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-sm font-bold text-white">Uploaded Media ({filteredMedia.length})</h2>
                    <input
                      type="text"
                      placeholder="Search media..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  {filteredMedia.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-xs">
                      No media found in public/uploads.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMedia.map((item) => (
                        <div
                          key={item.filename}
                          className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-all flex flex-col"
                        >
                          <div className="h-32 bg-slate-900 flex items-center justify-center overflow-hidden relative">
                            {item.filename.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={item.url}
                                alt={item.filename}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="text-slate-500 text-xs font-mono">{item.filename.split(".").pop()?.toUpperCase()}</div>
                            )}
                          </div>

                          <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                            <div>
                              <div className="text-xs font-medium text-slate-200 truncate">{item.filename}</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">
                                {(item.size / 1024).toFixed(1)} KB
                              </div>
                            </div>

                            <button
                              onClick={() => handleCopyUrl(item.url)}
                              className="w-full bg-slate-800 hover:bg-sky-600 text-white text-[11px] font-medium py-1.5 rounded-lg transition-colors flex items-center justify-center space-x-1"
                            >
                              {copiedUrl === item.url ? (
                                <span className="text-emerald-400">Copied!</span>
                              ) : (
                                <span>Copy URL</span>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 6: Raw JSON Fallback */}
            {activeTab === "json" && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-white font-mono">Advanced RAW JSON Editor</h2>
                      <p className="text-xs text-slate-400">For developers and advanced users</p>
                    </div>

                    <select
                      value={rawFileSelected}
                      onChange={(e) => {
                        setRawFileSelected(e.target.value);
                        if (e.target.value === "config/site.json") setRawJsonContent(JSON.stringify(siteData, null, 2));
                        if (e.target.value === "config/services.json") setRawJsonContent(JSON.stringify(servicesData, null, 2));
                        if (e.target.value === "config/faq.json") setRawJsonContent(JSON.stringify(faqData, null, 2));
                      }}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-sky-400 font-mono focus:outline-none"
                    >
                      <option value="config/site.json">config/site.json</option>
                      <option value="config/services.json">config/services.json</option>
                      <option value="config/faq.json">config/faq.json</option>
                    </select>
                  </div>

                  <textarea
                    value={
                      rawJsonContent ||
                      (rawFileSelected === "config/site.json"
                        ? JSON.stringify(siteData, null, 2)
                        : rawFileSelected === "config/services.json"
                          ? JSON.stringify(servicesData, null, 2)
                          : JSON.stringify(faqData, null, 2))
                    }
                    onChange={(e) => {
                      setRawJsonContent(e.target.value);
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (rawFileSelected === "config/site.json") setSiteData(parsed);
                        if (rawFileSelected === "config/services.json") setServicesData(parsed);
                        if (rawFileSelected === "config/faq.json") setFaqData(parsed);
                        markChanged();
                      } catch {
                        // Invalid JSON draft
                      }
                    }}
                    rows={20}
                    className="w-full bg-slate-950 font-mono text-xs text-sky-200 border border-slate-800 rounded-xl p-4 leading-relaxed focus:outline-none focus:border-sky-500"
                  />
                </div>

              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
