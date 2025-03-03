import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  // private apiUrl = 'http://localhost:9090/api/agents'; // Base API URL.

  private apiUrl = environment.apiUrl; //?  apiUrl: 'http://localhost:8080/api',

  constructor(private http: HttpClient) {}

  // Register agent
  registerAgent(agent: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/agents/registerTemporaryAgent`,
      agent
    );
  }



  // Update Agent
  updateAgent(agentId: number, agent: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/agents/updateAgent/${agentId}`, agent);
  }

  // Delete Agent
  deleteAgent(agentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/agents/deleteAgent/${agentId}`);
  }

  // Get Agent By ID
  getAgentById(agentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/agents/getAgentById/${agentId}`);
  }

  // Get All Agents
  getAllAgents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/agents/getAllAgents`);
  }

  // Get All Pending Agents
  getAllPendingAgents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/agents/getAllPendingAgents`);
  }

  // Approve Agent
  approveAgent(tempAgentId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/agents/approveAgent/${tempAgentId}`,
      {}
    );
  }

  // Reject Agent
  rejectAgent(tempAgentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/agents/rejectAgent/${tempAgentId}`);
  }

  changePassword(
    agentId: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/agents/changeAgentPassword/${agentId}`,
      null,
      {
        params: {
          oldPassword,
          newPassword,
        },
      }
    );
  }
}
