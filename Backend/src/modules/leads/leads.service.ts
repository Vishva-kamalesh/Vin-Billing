import { LeadsRepository } from './leads.repository';
import { CreateLeadDto, UpdateLeadDto, ScheduleFollowupDto } from './leads.dto';

export class LeadsService {
  private repository: LeadsRepository;

  constructor() {
    this.repository = new LeadsRepository();
  }

  async createLead(data: CreateLeadDto) {
    return this.repository.create(data);
  }

  async updateLead(id: string, data: UpdateLeadDto) {
    return this.repository.update(id, data);
  }

  async getLead(id: string) {
    const lead = await this.repository.getById(id);
    if (!lead) throw new Error('Lead not found');
    return lead;
  }

  async getLeads(status?: string, source?: string, assigned_to?: string, group_by?: string) {
    const leads = await this.repository.getLeadsByStatus(status, source, assigned_to);

    if (group_by === 'status') {
      const grouped: any = {
        NEW: [],
        CONTACTED: [],
        QUOTED: [],
        WON: [],
        LOST: []
      };

      leads.forEach(lead => {
        if (grouped[lead.status]) {
          grouped[lead.status].push(lead);
        } else {
          grouped[lead.status] = [lead];
        }
      });

      return grouped;
    }

    return leads;
  }

  async scheduleFollowup(lead_id: string, data: ScheduleFollowupDto, created_by: string) {
    return this.repository.addFollowup(lead_id, data, created_by);
  }

  async markFollowupDone(followup_id: string) {
    return this.repository.markFollowupDone(followup_id);
  }

  async convertLead(lead_id: string) {
    const lead = await this.getLead(lead_id);
    if (lead.status === 'WON') {
      throw new Error('Lead is already converted');
    }
    return this.repository.convertLead(lead_id, lead);
  }
}
