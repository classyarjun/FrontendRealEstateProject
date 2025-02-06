

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../modal/agent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  // private apiUrl = 'http://localhost:8080/api/agents'; // Base API URL.

    private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',


  constructor(private http: HttpClient) {}

  // Register a new agent
  registerAgent(agent: Agent, profilePicture?: File): Observable<Agent> {
    const formData = new FormData();
    formData.append('agent', JSON.stringify(agent));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    return this.http.post<Agent>(`${this.apiUrl}/agents/registerAgent`, formData);
  }

  // Login agent
  loginAgent(username: string, password: string): Observable<Agent> {
    const loginDetails = { username, password };
    return this.http.post<Agent>(`${this.apiUrl}/agents/loginAgent`, loginDetails);
  }


  getAllAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}/agents/getAllAgents`)
  }

  getAgentById(agentId: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.apiUrl}/agents/getAgentById/${agentId}`)
  }


  deleteAgent(agentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/agents/deleteAgent/${agentId}`)
  }


  updateAgent(agentId: number, agent: Agent, profilePicture?: File): Observable<Agent> {
    const formData = new FormData()
    formData.append("agent", JSON.stringify(agent))
    if (profilePicture) {
      formData.append("profilePicture", profilePicture)
    }
    return this.http.put<Agent>(`${this.apiUrl}/agents/updateAgent/${agentId}`, formData)
  }


}

