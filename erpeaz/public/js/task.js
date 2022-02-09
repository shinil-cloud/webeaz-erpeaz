frappe.ui.form.on('Task',
{
    onload(frm)
    {
        
        
        
    },
    status(frm)
    {
        if(frm.doc.status==="Completed" && frm.doc.assign_to !==undefined)
        {
            frm.set_value("completed_by",frm.doc.assign_to );
        }
    },
    
    
	after_save(frm) 
	{
	   // var name=frappe.user;
	   var name=frappe.session.user;
	   
	  if(frm.doc.status==="Assigned")  
	  {
	    if(frm.doc.issue !==null)
	    {
	              frappe.db.insert
                  ({
                    doctype:'ToDo',
                     status:frm.doc.status,
                     priority:frm.doc.priority,
                    project:frm.doc.project,
                    date:frm.doc.due_date,
                    owner:frm.doc.assign_to,
                    subject:frm.doc.subject,
                    description:frm.doc.description,
                    issue:frm.doc.issue,
                    reference_type:"Task",
                    reference_name:frm.doc.name,
                    assigned_by:name,
                    
                  })
                  .then(function(doc)
                  { 
                    msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
                  }); 
	    }
	     else if(frm.doc.issue ===null)
	    {
	              frappe.db.insert
                  ({
                    doctype:'ToDo',
                     status:frm.doc.status,
                     priority:frm.doc.priority,
                    project:frm.doc.project,
                    date:frm.doc.due_date,
                    owner:frm.doc.assign_to,
                    subject:frm.doc.subject,
                    description:frm.doc.description,
                    reference_type:"Task",
                    reference_name:frm.doc.name,
                    assigned_by:name,
                    
                  })
                  .then(function(doc)
                  { 
                    msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
                  }); 
	    }

    }


     }
});
