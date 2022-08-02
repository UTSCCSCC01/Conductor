import { Context, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './WebApp.css'

import { useNavigate } from "react-router-dom";

import logo from './resource/Playstore.png'
import refresh from './resource/Refresh.png'
import SearchWebApp from './search/SearchWebApp';

const USERS = [
    "MongoDBCompass",
    "Reference Documentation",
    "Command Prompt",
    "ODBC Data Sources (64-bit)",
    "MSYS2 MSYS",
    "On-Screen Keyboard",
    "Wordpad",
    "Install Additional Tools for Node.js",
    "Samples for Desktop Apps",
    "Microsoft To Do",
    "Visual Studio Installer",
    "Performance Monitor",
    "Tips",
    "Zoom",
    "Git GUI",
    "Node.js documentation",
    "Python 3.10 Manuals (64-bit)",
    "Voice Recorder",
    "x86 Native Tools Command Prompt for VS 2019",
    "Google Chrome",
    "Skype for Business Recording Manager",
    "MSYS2 MinGW UCRT x64",
    "NVIDIA Control Panel",
    "Speech Recognition",
    "pgAdmin 4 v6",
    "Windows Speech Recognition",
    "Wing Personal 8",
    "IDLE (Python 3.10 64-bit)",
    "Uninstall ShareX",
    "ODBC Data Sources (32-bit)",
    "Films & TV",
    "Debuggable Package Manager",
    "Word",
    "Settings",
    "Windows Memory Diagnostic",
    "Administrative Tools",
    "Event Viewer",
    "Excel",
    "Node.js",
    "Documentation for Windows Store Apps",
    "OneNote",
    "Component Services",
    "Defragment and Optimize Drives",
    "Windows File Recovery",
    "Microsoft Teams",
    "x64 Native Tools Command Prompt for VS 2019",
    "Resource Monitor",
    "ShareX",
    "Git FAQs (Frequently Asked Questions)",
    "Calendar",
    "Publisher",
    "Mail",
    "Photos",
    "Documentation for Desktop Apps",
    "Xbox Game Bar",
    "RecoveryDrive",
    "Telemetry Dashboard for Office",
    "Video editor",
    "Uninstall Recuva",
    "Power Automate",
    "IntelliJ IDEA Community Edition 2022.1.1",
    "Media Player",
    "Task Scheduler",
    "Application Verifier (WOW)",
    "services",
    "Phone Link",
    "Git CMD",
    "Database Compare",
    "OBS Studio (64bit)",
    "Narrator",
    "Maps",
    "Telemetry Log for Office",
    "Discord",
    "Get Started",
    "Calculator",
    "Samples for Windows Store Apps",
    "Developer Command Prompt for VS 2019",
    "Tools for Windows Store Apps",
    "Uninstall",
    "Microsoft News",
    "Office Language Preferences",
    "MSYS2 MinGW x86",
    "Feedback Hub",
    "Git Release Notes",
    "Windows Software Development Kit",
    "Outlook",
    "Spotify",
    "Node.js command prompt",
    "System Information",
    "Python 3.10 (64-bit)",
    "Snipping Tool",
    "Sticky Notes",
    "Weather",
    "PowerPoint",
    "Docker Desktop",
    "Get Help",
    "Microsoft Store",
    "Tools for Desktop Apps",
    "Windows Security",
    "Skype for Business",
    "Camera",
    "HeidiSQL",
    "Windows PowerShell (x86)",
    "MSYS2 MinGW x64",
    "Windows PowerShell",
    "Bandicam",
    "MSYS2 MinGW Clang x64",
    "Application Verifier Help",
    "Computer Management",
    "Python 3.10 Module Docs (64-bit)",
    "Control Panel",
    "Disk Cleanup",
    "Visual Studio Code",
    "Microsoft Teams (work or school)",
    "Magnify",
    "OneDrive",
    "Git Bash",
    "Terminal",
    "WordPad",
    "Clock",
    "Run",
    "x64_x86 Cross Tools Command Prompt for VS 2019",
    "Recovery Drive",
    "iSCSI Initiator",
    "Quick Assist",
    "dfrgui",
    "Application Verifier (X64)",
    "Windows PowerShell ISE (x86)",
    "Windows Tools",
    "Windows Defender Firewall with Advanced Security",
    "Windows PowerShell ISE",
    "Character Map",
    "System Configuration",
    "Windows App Cert Kit",
    "Magnifier",
    "Paint",
    "General help",
    "Waves MaxxAudio",
    "Recuva",
    "BandiFix",
    "Services",
    "Uninstall Node.js",
    "MinGW Installation Manager",
    "Postman",
    "Windows Media Player",
    "Notepad",
    "Remote Desktop Connection",
    "Uninstall Zoom",
    "Samsung Printer Experience",
    "Steps Recorder",
    "Realtek Audio Console",
    "Access",
    "File Explorer",
    "Registry Editor",
    "Microsoft Edge",
    "x86_x64 Cross Tools Command Prompt for VS 2019",
    "Neo4j Desktop",
    "Cortana",
    "Windows Fax and Scan",
    "Spreadsheet Compare",
    "Memory Diagnostics Tool",
    "Recuva Homepage",
    "Node.js website",
    "Task Manager",
    "Developer PowerShell for VS 2019",
    "Office"
]


const WebApp = () => {

    const logoutNotice = () => {toast.info("User has been logged out.")}
    let navigate = useNavigate();

    //Move this into a Auth util in future?
    function revokeUserToken(){ 
        logoutNotice();
        navigate("/logout");
    }

   
    return (
        <div className="homepage-container">
 
            <div className="application-header-type-box">
                <div className="application-header-name">
                    <img src={logo} width="75px" alt="Orchestra Logo" />
                    <h1>Orchestra Web Applets</h1>
                </div>

                <div className="application-header-name-sync">
                    <img src={refresh} width="25px" alt="Orchestra Logo" />
                    <h2>Synchronize with servers</h2>
                </div>

            </div>

            <SearchWebApp appletList={USERS} type="webapp" />


        </div>
    )
};

export default WebApp;

