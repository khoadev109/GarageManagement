using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageManagement.Garage.Entity.Entities
{
    public class Quotation : BaseEntity<string>
    {
        public Quotation()
        {
            Items = new HashSet<QuotationItem>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GenerateId { get; set; }
        public string AdviserName { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpectedCompleteDate { get; set; }
        public Nullable<DateTime> CompleteDate { get; set; }
        public Nullable<DateTime> UpdateDate { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string Note { get; set; }
        public Nullable<int> NextKm { get; set; }
        public Nullable<DateTime> NextMaintenanceDate { get; set; }
        public Nullable<bool> Tracking { get; set; }

        public string BranchId { get; set; }
        public int CustomerExchangeId { get; set; }
        public int StatusId { get; set; }
        public string AdviserId { get; set; }

        public virtual Branch Branch { get; set; }
        public virtual CustomerExchange CustomerExchange { get; set; }
        public virtual QuotationStatus Status { get; set; }
        public virtual Customer Adviser { get; set; }
        public virtual ICollection<QuotationItem> Items { get; set; }
    }
}
