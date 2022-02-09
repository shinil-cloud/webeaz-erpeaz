frappe.ui.form.on('Issue',
{
	onload(frm) 
	{
	    
		if(frappe.user.name !==undefined)
        {
            frm.set_value("raised_by",frappe.user.name);
        }
	},
	after_save(frm) 
	{
	    var name=frappe.session.user;
	    var x;
	    var y;
	   // console.log(frm.doc.description);
	   // console.log(frm.doc.issue);
	  if(frm.doc.status==="Assigned")  
	  {
	   // if(frm.doc.issue !==null)
	   // {
	              frappe.db.insert
                  ({
                    doctype:'Task',
                    status:frm.doc.status,
                    priority:frm.doc.priority,
                    project:frm.doc.pro,
                    due_date:frm.doc.due_date,
                    assign_to:frm.doc.assign_to,
                    subject:frm.doc.subject,
                    description:frm.doc.description,
                    issue:frm.doc.name,
                  })
                  .then(function(doc)
                  { 
                       x=doc.name;
                     
                     console.log("x",x);
                     console.log("y",y);
                    // frappe.db.set_value("ToDo",y,"reference_name",x);
                     msgprint(`Task ${doc.subject} is Created`);
                    
                  }); 
                   console.log(x);
                  frappe.db.insert
                  ({
                    doctype:'ToDo',
                     subject:frm.doc.subject,
                     status:frm.doc.status,
                     priority:frm.doc.priority,
                    project:frm.doc.pro,
                    date:frm.doc.due_date,
                    owner:frm.doc.assign_to,
                    description:frm.doc.description,
                    issue:frm.doc.name,
                    reference_type:"Task",
                    reference_name:x,
                    assigned_by:frappe.session.user,
                  })
                  .then(function(doc)
                  { 
                       y=doc.name;
                       frappe.db.set_value("ToDo",y,"reference_name",x);
                    msgprint(`Assigned Issue To ${doc.owner}`);
                  }); 
                  
                  
                   // frappe.db.set_value('Issue', frm.doc.issue, 'status',frm.doc.status);
                
                
                
                
                  
	   // }
	   //  else if(frm.doc.issue ===null)
	   // {
	   //           frappe.db.insert
    //               ({
    //                 doctype:'ToDo',
    //                  status:frm.doc.status,
    //                  priority:frm.doc.priority,
    //                 project:frm.doc.project,
    //                 date:frm.doc.due_date,
    //                 owner:frm.doc.assign_to,
    //                 subject:frm.doc.subject,
    //                 description:frm.doc.description,
    //                 reference_type:"Task",
    //                 reference_name:frm.doc.name,
    //                 assigned_by:"Sana",
                    
    //               })
    //               .then(function(doc)
    //               { 
    //                 msgprint(`Task ${doc.subject} is assigned to ${doc.owner}`);
    //               }); 
	   // }
	  }
	}
});
