
import { Component, type OnInit } from "@angular/core"
import { Agent } from "../../modal/agent";
import { AgentService } from '../../services/agent.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
    agents: Agent[] = []

    constructor(private AgentService: AgentService) {}

    ngOnInit(): void {
      this.loadAgents()
    }

    loadAgents(): void {
      this.AgentService.getAllAgents().subscribe(
        (agents) => (this.agents = agents),
        (error) => console.error("Error fetching agents:", error),
      )
    }

    deleteAgent(id: number): void {
      if (confirm("Are you sure you want to delete this agent?")) {
        this.AgentService.deleteAgent(id).subscribe(
          () => {
            this.agents = this.agents.filter((agent) => agent.id !== id)
            console.log("Agent deleted successfully")
          },
          (error) => console.error("Error deleting agent:", error),
        )
      }
    }

//updateAgent


  }

