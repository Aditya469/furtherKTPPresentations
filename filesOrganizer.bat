@echo off
echo Organizing files for GitHub Pages...

:: Create directory structure
mkdir assets
mkdir assets\images
mkdir assets\documents
mkdir assets\css
mkdir assets\js

:: Copy chart images
copy "static\required_files\ecam-ktp-presentation\*.png" "assets\images\"
copy "static\required_files\ecam-ktp-presentation\*.jpg" "assets\images\"

:: Copy documents
copy "static\required_files\ecam-ktp-presentation\*.docx" "assets\documents\"
copy "static\required_files\ecam-ktp-presentation\*.pdf" "assets\documents\"

:: Rename HTML files
copy "presentation_landing.html" "index.html"
copy "next_project.html" "ai-iot-project.html"
copy "marketing_project.html" "marketing-project.html"

echo File organization complete!
echo Ready for GitHub upload.
pause
