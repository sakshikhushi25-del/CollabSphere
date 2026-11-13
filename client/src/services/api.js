const API_URL = "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

async function request(endpoint, options = {}) {
    const token = getToken();

    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}

export function loginUser(credentials) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    });
}

export function registerUser(userData) {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
}

export function getProjects() {
    return request("/projects");
}

export function createProject(projectData) {
    return request("/projects", {
        method: "POST",
        body: JSON.stringify(projectData)
    });
}

export function deleteProject(projectId) {
    return request(`/projects/${projectId}`, {
        method: "DELETE"
    });
}

export function updateProject(projectId, projectData) {
    return request(`/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(projectData)
    });
}

export function getProjectById(projectId) {
    return request(`/projects/${projectId}`);
}

export function inviteMember(projectId, email) {
    return request(`/projects/${projectId}/invite`, {
        method: "POST",
        body: JSON.stringify({ email })
    });
}

export function removeMember(projectId, memberId) {
    return request(`/projects/${projectId}/members/${memberId}`, {
        method: "DELETE"
    });
}

export function createNote(projectId, noteData) {
    return request(`/notes/${projectId}`, {
        method: "POST",
        body: JSON.stringify(noteData)
    });
}

export function getProjectNotes(projectId) {
    return request(`/notes/${projectId}`);
}

export function updateNote(projectId, noteId, noteData) {
    return request(`/notes/${projectId}/${noteId}`, {
        method: "PUT",
        body: JSON.stringify(noteData)
    });
}

export function deleteNote(projectId, noteId) {
    return request(`/notes/${projectId}/${noteId}`, {
        method: "DELETE"
    });
}

export function uploadFile(projectId, file) {
    const formData = new FormData();

    formData.append("file", file);

    return request(`/files/${projectId}`, {
        method: "POST",
        body: formData
    });
}

export function getProjectFiles(projectId) {
    return request(`/files/${projectId}`);
}

export function updateFileVisibility(projectId, fileId, isPublic) {
    return request(`/files/${projectId}/${fileId}/visibility`, {
        method: "PATCH",
        body: JSON.stringify({ isPublic })
    });
}

export function deleteFile(projectId, fileId) {
    return request(`/files/${projectId}/${fileId}`, {
        method: "DELETE"
    });
}

export function explainContent(projectId, content) {
    return request(`/gemini/${projectId}/explain`, {
        method: "POST",
        body: JSON.stringify({ content })
    });
}

export function improveContent(projectId, content) {
    return request(`/gemini/${projectId}/improve`, {
        method: "POST",
        body: JSON.stringify({ content })
    });
}

export function generateDocs(projectId, content, projectName) {
    return request(`/gemini/${projectId}/docs`, {
        method: "POST",
        body: JSON.stringify({ content, projectName })
    });
}

export function generateReadme(projectId, content, projectName, description) {
    return request(`/gemini/${projectId}/readme`, {
        method: "POST",
        body: JSON.stringify({
            content,
            projectName,
            description
        })
    });
}

export function getProjectAnalytics(projectId) {
    return request(`/analytics/${projectId}`);
}

export function enableProjectSharing(projectId) {
    return request(`/projects/${projectId}/share`, {
        method: "POST"
    });
}

export function disableProjectSharing(projectId) {
    return request(`/projects/${projectId}/share`, {
        method: "DELETE"
    });
}

export function getPublicProject(shareToken) {
    return request(`/public/projects/${shareToken}`);
}
