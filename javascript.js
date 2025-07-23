```
// Global variables
let uploadedFiles = [];
let analysisResults = [];
let shortlistedCandidates = [];

// DOM Elements
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const browseFiles = document.getElementById('browse-files');
const progress = document.getElementById('progress');
const uploadStatus = document.getElementById('upload-status');
const fileCount = document.getElementById('file-count');
const analyzeBtn = document.getElementById('analyze-btn');
const resultsTable = document.getElementById('results-table');
const sendEmailsBtn = document.getElementById('send-emails');
const emailModal = document.getElementById('email-modal');
const closeModal = document.getElementById('close-modal');
const confirmSend = document.getElementById('confirm-send');
const previewEmails = document.getElementById('preview-emails');
const previewModal = document.getElementById('preview-modal');
const closePreview = document.getElementById('close-preview');
const backToEdit = document.getElementById('back-to-edit');
const finalSend = document.getElementById('final-send');

// Event Listeners
browseFiles.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelection);
dropzone.addEventListener('dragover', handle
```
