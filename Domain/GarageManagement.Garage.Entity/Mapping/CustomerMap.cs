using System.Data.Entity.ModelConfiguration;
using GarageManagement.Garage.Entity.Entities;

namespace GarageManagement.Garage.Entity.Mapping
{
    public class CustomerMap : EntityTypeConfiguration<Customer>
    {
        public CustomerMap()
        {
            ToTable("gm_customer");

            // Primary Key
            HasKey(x => x.Id).Property(p => p.Id).HasColumnName("gm_customer_id").IsRequired().HasMaxLength(50);

            // Properties
            Property(x => x.GenerateId).HasColumnName("gm_customer_generate_id").IsRequired();
            Property(x => x.Name).HasColumnName("gm_customer_name").IsRequired().HasMaxLength(200);
            Property(x => x.Address).HasColumnName("gm_customer_address").HasMaxLength(200);
            Property(x => x.Phone).HasColumnName("gm_customer_phone").HasMaxLength(20);
            Property(x => x.Fax).HasColumnName("gm_customer_fax").HasMaxLength(20);
            Property(x => x.Email).HasColumnName("gm_customer_email").HasMaxLength(200);
            Property(x => x.Website).HasColumnName("gm_customer_website").HasMaxLength(200);
            Property(x => x.Province).HasColumnName("gm_customer_province").HasMaxLength(30);
            Property(x => x.District).HasColumnName("gm_customer_district").HasMaxLength(30);
            Property(x => x.Ward).HasColumnName("gm_customer_ward").HasMaxLength(30);
            Property(x => x.TaxCode).HasColumnName("gm_customer_taxcode").HasMaxLength(50);
            Property(x => x.BankAccount).HasColumnName("gm_customer_bankaccount").HasMaxLength(100);
            Property(x => x.BankName).HasColumnName("gm_customer_bankname").HasMaxLength(100);
            Property(x => x.IsSupplier).HasColumnName("gm_customer_issupplier");
            Property(x => x.CreatedDate).HasColumnName("gm_customer_createddate");
            Property(x => x.ModifiedDate).HasColumnName("gm_customer_modifieddate");
            Property(x => x.ContactName).HasColumnName("gm_customer_contactname").HasMaxLength(128);
            Property(x => x.ContactPhone).HasColumnName("gm_customer_contactphone").HasMaxLength(12);
            Property(x => x.ContactPosition).HasColumnName("gm_customer_contactposition").HasMaxLength(128);

            // Foreign Key
            Property(x => x.BranchId).HasColumnName("gm_branch_id");
            Property(x => x.CustomerTypeId).HasColumnName("gm_customer_type_id");

            // Relationship
            HasRequired(x => x.Branch).WithMany().HasForeignKey(f => f.BranchId);
            HasRequired(x => x.CustomerType).WithMany().HasForeignKey(f => f.CustomerTypeId);
        }
    }
}
