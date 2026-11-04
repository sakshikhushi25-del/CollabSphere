const API_URL = "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

async function request(endpoint, options = {}) {
    const token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? {Authorization: `Bearer ${token}`} : {}),
            ...options.headers
        }
    });
    const data = await response.json();

    if(!response.ok) {
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
    })
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
    return request(`/projects/${projectId}`), {
        method: "DELETE"
    }
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

export function inviteMember(projectId, email){
    return request(`/projects/${projectId}/invite`, {
        method: "POST",
        body: JSON.stringify({email})
    });
}