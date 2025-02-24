/*
    IPS - Escola Superior de Tecnologia
    Programação para a Web
    2024/2025

    Projeto Fase 2 Recurso

    Trabalho realizado por:
    202200232   Afonso Matos
    202200252   MiguelBorges
*/

"use strict";

function start() {
    UserInterface.setView('viewMembros');
}

class Selected {
    static #idRow;

    static getRowID() {
        return Number(this.#idRow);
    }

    static setRowID(idNew) {
        this.#idRow = idNew;
    }

    static clearRowID() {
        this.#idRow = -1;
    }
}


class UserInterface {
    static setView(id) {
        switch(id) {
            case 'viewMembros':
                Selected.clearRowID();
                this.setPage('gestaoMembros');
                document.getElementById('viewMembros').style.display = 'flex';
                document.getElementById('viewEventos').style.display = 'none';
                document.getElementById('viewTiposEventos').style.display = 'none';
                break;
            case 'viewEventos':
                Selected.clearRowID();
                this.setPage('gestaoEventos');
                document.getElementById('viewMembros').style.display = 'none';
                document.getElementById('viewEventos').style.display = 'flex';
                document.getElementById('viewTiposEventos').style.display = 'none';
                break;
            case 'viewTiposEventos':
                Selected.clearRowID();
                this.setPage('gestaoTiposEventos');
                document.getElementById('viewMembros').style.display = 'none';
                document.getElementById('viewEventos').style.display = 'none';
                document.getElementById('viewTiposEventos').style.display = 'flex';
                break;
            default:
                alert("Invalid View!");
        }
    }

    static setPage(id) {
        switch(id) {
            case 'gestaoMembros':
                this.gestaoMembros();
                document.getElementById('gestaoMembros').style.display = 'flex';
                document.getElementById('formularioMembro').style.display = 'none';
                break;
            case 'formularioCriarMembro':
                this.gestaoMembros();
                this.formularioCriarMembro();
                document.getElementById('gestaoMembros').style.display = 'flex';
                document.getElementById('formularioMembro').style.display = 'flex';
                break;
            case 'formularioEditarMembro':
                this.gestaoMembros();
                this.formularioEditarMembro();
                document.getElementById('gestaoMembros').style.display = 'flex';
                document.getElementById('formularioMembro').style.display = 'flex';
                break;
            case 'gestaoEventos':
                this.gestaoEventos();
                document.getElementById('gestaoEventos').style.display = 'flex';
                document.getElementById('formularioEvento').style.display = 'none';
                break;
            case 'formularioCriarEvento':
                this.gestaoEventos();
                this.formularioCriarEvento();
                document.getElementById('gestaoEventos').style.display = 'flex';
                document.getElementById('formularioEvento').style.display = 'flex';
                break;
            case 'formularioEditarEvento':
                this.gestaoEventos();
                this.formularioEditarEvento();
                document.getElementById('gestaoEventos').style.display = 'flex';
                document.getElementById('formularioEvento').style.display = 'flex';
                break;
            case 'gestaoTiposEventos':
                this.gestaoTipoEventos();
                document.getElementById('gestaoTiposEventos').style.display = 'flex';
                document.getElementById('formularioTipoEvento').style.display = 'none';
                break;
            case 'formularioCriarTiposEvento':
                this.gestaoTipoEventos();
                this.formularioCriarTipoEvento();
                document.getElementById('gestaoTiposEventos').style.display = 'flex';
                document.getElementById('formularioTipoEvento').style.display = 'flex';
                break;
            case 'formularioEditarTiposEvento':
                this.gestaoTipoEventos();
                this.formularioEditarTipoEvento();
                document.getElementById('gestaoTiposEventos').style.display = 'flex';
                document.getElementById('formularioTipoEvento').style.display = 'flex';
                break;
            default:
                alert("Invalid Page!");
        }
    }


    //---------------Membros---------------//

    static async gestaoMembros() {
        let target = document.getElementById('gestaoMembros');

        const divStructure = document.createElement('div'); 
        divStructure.classList.add("structure");

        //Criar o título
        const title = this.createTitle("Members", "h2");

        let members = await MemberManager.getMembers();
        
        //Criar a tabela com todos os membros
        let membersTable = document.createElement('table');
        let tableHead = Member.toTH();
        membersTable.appendChild(tableHead);
        membersTable.classList.add("table");

        //Criar as linhas para cada membro
        let tableBody = document.createElement('tbody');
        for (let member of members) {
            tableBody.appendChild(member.toTR());
        }
        membersTable.appendChild(tableBody);

        const divButtons = document.createElement('div'); 
        divButtons.classList.add("buttons");

        //---------------Criar os boões (Add/Edit/Delete)---------------//
        const buttonAddMember = this.makeButton("Add Member");
        buttonAddMember.addEventListener("click", () => {
            UserInterface.setPage("formularioCriarMembro");
        });

        const buttonEditMember = this.makeButton("Edit Member");
        buttonEditMember.addEventListener("click", async () => {
            if(Selected.getRowID() > 0) {
                UserInterface.setPage("formularioEditarMembro");
            } else {
                this.exibirMensagemErro("You need to select an Item!", "avisoMembros");
            }
        });

        const buttonDeleteMember = this.makeButton("Delete Member");
        buttonDeleteMember.addEventListener("click", async () => {
                if (Selected.getRowID() < 0) {
                    this.exibirMensagemErro("You need to select an Item!", "avisoMembros");
                } else {
                    await MemberManager.deleteMember(Selected.getRowID());
                    UserInterface.setPage('gestaoMembros');
                    Selected.clearRowID();
                }
            });
        divButtons.appendChild(buttonAddMember);
        divButtons.appendChild(buttonEditMember);
        divButtons.appendChild(buttonDeleteMember);
        
        divStructure.appendChild(title);
        divStructure.appendChild(membersTable);
        divStructure.appendChild(divButtons);

        const avisoEventos = this.createAlertError("avisoMembros");
        avisoEventos.id = "avisoMembros";
        
        divStructure.appendChild(avisoEventos);

        target.replaceChildren(divStructure);
    }

    static async formularioCriarMembro() {
        let target = document.getElementById('formularioMembro')

        const form = document.createElement("div");
        form.classList.add("formulario");
        form.id = "formularioMembro";

        const titulo = this.createTitle("Member", "h3");

        // Nome do membro
        const labelNome = document.createElement("label");
        labelNome.textContent = "Nome:";
        const inputNome = document.createElement("input");
        inputNome.type = "text";
        inputNome.id = "nome-membro-input";

        // Tipos de Eventos Preferidos (Checkbox)
        const labelTipos = document.createElement("label");
        labelTipos.textContent = "Tipos de Eventos Preferidos:";
        const fieldset = document.createElement("fieldset");

        let eventTypes = await EventTypesManager.getEventTypes();

        let checkboxes = [];

        for(let eventType of eventTypes) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = eventType.getID();
            checkbox.id = `tipo-${eventType.getDescription().replace(/\s+/g, '-').toLowerCase()}`;

            const label = document.createElement("label");
            label.htmlFor = checkbox.id;
            label.textContent = eventType.getDescription();

            checkboxes.push(checkbox);

            fieldset.appendChild(checkbox);
            fieldset.appendChild(label);
            fieldset.appendChild(document.createElement("br"));
        }

        form.appendChild(titulo);
        form.appendChild(labelNome);
        form.appendChild(inputNome);
        form.appendChild(labelTipos);
        form.appendChild(fieldset);

        // 🔹 Botões do formulário
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("form-buttons");

        const btnGravar = this.makeButton("Save");
        btnGravar.addEventListener("click",async () => {
            if(await MemberManager.getMemberByName(inputNome.value) === false){
                await MemberManager.addMember(inputNome.value);
            
                let newMember = await MemberManager.getMemberByName(inputNome.value);

                for(let checkbox of checkboxes){
                    if(checkbox.checked === true){
                        await MemberEventTypesManager.addEventTypeMember(newMember.getID() , checkbox.value);
                    }
                }
            } else {
                this.exibirMensagemErro("This member already exists!", "avisoCriarMembros");
            }
            

        });

        const btnCancelar = this.makeButton("Cancel");
        btnCancelar.addEventListener("click", () => UserInterface.setView('viewMembros'));

        buttonContainer.appendChild(btnGravar);
        buttonContainer.appendChild(btnCancelar);

        form.appendChild(buttonContainer);

        const avisoEventos = this.createAlertError("avisoCriarMembros");
        avisoEventos.id = "avisoCriarMembros";
        
        form.appendChild(avisoEventos);

        target.replaceChildren(form);

    }

    static async formularioEditarMembro() {
        if(Selected.getRowID() > 0) {
            let target = document.getElementById('formularioMembro');

            let selectedMember = await MemberManager.getMembersById(Selected.getRowID());

            const form = document.createElement("div");
            form.classList.add("formulario");
            form.id = "formularioMembro";

            const titulo = this.createTitle("Members", "h3");

            // Nome do membro
            const labelNome = document.createElement("label");
            labelNome.textContent = "Nome:";
            const inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.id = "nome-membro-input";
            inputNome.value = (selectedMember).getName();

            // Tipos de Eventos Preferidos (Checkbox)
            const labelTipos = document.createElement("label");
            labelTipos.textContent = "Tipos de Eventos Preferidos:";
            const fieldset = document.createElement("fieldset");

            let eventTypes = await EventTypesManager.getEventTypes();

            let eventTypesByMember = await MemberEventTypesManager.getEventsTypeByMember(Selected.getRowID());

            let checkboxes = [];

            for(let eventType of eventTypes) {
                
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = eventType.getID();
                checkbox.id = `tipo-${eventType.getDescription().replace(/\s+/g, '-').toLowerCase()}`;
                for(let type of eventTypesByMember) {
                    if(type.getID() === eventType.getID()) {
                        checkbox.checked = true;
                        break;
                    }
                }

                const label = document.createElement("label");
                label.htmlFor = checkbox.id;
                label.textContent = eventType.getDescription();

                checkboxes.push(checkbox);

                fieldset.appendChild(checkbox);
                fieldset.appendChild(label);
                fieldset.appendChild(document.createElement("br"));
            }

            form.appendChild(titulo);
            form.appendChild(labelNome);
            form.appendChild(inputNome);
            form.appendChild(labelTipos);
            form.appendChild(fieldset);

            const eventosTitulo = this.createTitle("Events", "h4");

            let divPossibleEvents = document.createElement('div');
            divPossibleEvents.id = "tabelaEventos";
            
            let events = await MemberEventManager.getEventsByMember(Selected.getRowID());

            let tabelaEventos = await this.replacePossibleEvents(events);

            divPossibleEvents.appendChild(tabelaEventos);

            form.appendChild(eventosTitulo);
            form.appendChild(divPossibleEvents);

            const divBotoesEventos = document.createElement("div");
            divBotoesEventos.classList.add("buttons");

            const btnInscrever = this.makeButton("Subscribe in the Event");
            btnInscrever.onclick = () => {
                let formulario = document.getElementById('formularioInscricao');
                if(formulario){
                    document.getElementById('formularioInscricao').remove();
                    UserInterface.abrirFormularioInscricaoEvento(selectedMember);
                } else {
                    UserInterface.abrirFormularioInscricaoEvento(selectedMember);
                }
            }

            const btnDesinscrever = this.makeButton("Unsubscribe");
            btnDesinscrever.onclick = async () => {
                let formulario = document.getElementById('formularioInscricao');
                if(formulario){
                    document.getElementById('formularioInscricao').remove();
                }
                let tbody = document.getElementById('eventos-membro-body');

                let actualIds = await this.getTableIds(tbody);

                let actualEvents = [];

                for(let id of actualIds) {
                    if(Number(id.innerText) === Selected.getRowID()){
                    }else {
                        let event = await EventManager.getEventById(Number(id.innerText));
                        actualEvents.push(event);
                    }
                }

                let newTable = await this.replacePossibleEvents(actualEvents);

                document.getElementById('tabelaEventos').replaceChildren(newTable);
                Selected.setRowID(selectedMember.getID());
            }

            divBotoesEventos.appendChild(btnInscrever);
            divBotoesEventos.appendChild(btnDesinscrever);

            form.appendChild(divBotoesEventos);

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("form-buttons");

            const btnGravar = this.makeButton("Save");
            btnGravar.addEventListener("click", async () => {

                if(!inputNome.value){
                    this.exibirMensagemErro("ERROR: Invalid data. Check the entered name.", "avisoEditarMembros");
                    return;
                }

                if((await MemberManager.getMemberByName(inputNome.value)).getName() !== selectedMember.getName()){
                    if(await MemberManager.getMemberByName(inputNome.value) !== false ){
                        UserInterface.exibirMensagemErro("ERROR: This name already exists.", "avisoEditarMembros");
                        return;
                    }
                }
                confirm = await  MemberManager.editMember(Selected.getRowID() ,inputNome.value);

                for(let checkbox of checkboxes){
                    if(checkbox.checked === true){
                        if(((await MemberEventTypesManager.alreadyExists(Selected.getRowID(), Number(checkbox.value))) === false)) {
                            await MemberEventTypesManager.addEventTypeMember(Selected.getRowID(), checkbox.value);
                        }
                    } else {
                        if(await MemberEventTypesManager.alreadyExists(Selected.getRowID(), Number(checkbox.value)) === true) {
                            let id = await MemberEventTypesManager.findEventTypeMember(Selected.getRowID(), Number(checkbox.value));
                            await MemberEventTypesManager.deleteEventTypeMember(id);
                        }
                    }
                }

                let tbody = document.getElementById('eventos-membro-body');

                let newEventsIds = await this.getTableIds(tbody);

                let memberEvents = await MemberEventManager.getMemberEventsByMember(Selected.getRowID());

                for(let memberEvent of memberEvents){
                    await MemberEventManager.deleteMemberEvent(memberEvent.getID());
                }

                for(let newMemberEventoId of newEventsIds){
                    await MemberEventManager.addMemberEvent(Selected.getRowID(), Number(newMemberEventoId.innerText));
                }

                this.setView('viewMembros');
                
            });

            const btnCancelar = this.makeButton("Cancel");
            btnCancelar.addEventListener("click", () => UserInterface.setView('viewMembros'));

            buttonContainer.appendChild(btnGravar);
            buttonContainer.appendChild(btnCancelar);

            form.appendChild(buttonContainer);

            const avisoEventos = this.createAlertError("avisoEditarMembros");
            avisoEventos.id = "avisoEditarMembros";
            
            form.appendChild(avisoEventos);

            target.replaceChildren(form);
        } else {
            alert('Select a Member to edit!');
        }
        
    }

    static async replacePossibleEvents(events) {
        const tabelaEventos = document.createElement("table");
        tabelaEventos.classList.add("table");

        const thead = Event.toTh();

        tabelaEventos.appendChild(thead);


        const tbodyEventos = document.createElement("tbody");
        tbodyEventos.id = "eventos-membro-body";

        if (events.length > 0) {
            for (let event of events) {
                tbodyEventos.appendChild(await event.toTR());
            }
        }

        tbodyEventos.id = "eventos-membro-body";
        tabelaEventos.appendChild(tbodyEventos);

        return tabelaEventos;
    }


    static async abrirFormularioInscricaoEvento(selectedMember) {
        let target = document.getElementById('formularioMembro');

        let eventosDisponiveis = [];
        let eventosPossiveis = [];
        let events = await EventManager.getEvents();

        let tbody = document.getElementById('eventos-membro-body');

        let actualIds = await this.getTableIds(tbody);
        let actualEvents = [];
        for(let id of actualIds) {
            let event = await EventManager.getEventById(Number(id.innerText));
            actualEvents.push(event);
        }

        let preferedEventTypes = await MemberEventTypesManager.getEventsTypeByMember(selectedMember.getID());


        for (let y of events) {
            let found = false;
            
            for (let x of actualEvents) {
                if (y.getID() === x.getID()) {
                    found = true; 
                    break; 
                }
            }
            if (!found) {
                eventosPossiveis.push(y);
            }
            
        }

        console.log(eventosPossiveis);

        for(let event of eventosPossiveis) {
            for(let eventType of preferedEventTypes){
                if(event.getIdType() === eventType.getID()){
                    eventosDisponiveis.push(event);
                }
            }
        }

        let formularioInscricao = document.createElement("div");
        formularioInscricao.classList.add("formulario");
        formularioInscricao.id = "formularioInscricao";

        const titulo = this.createTitle("Event Registration", "h3");

        // Dropdown de eventos
        const labelEvento = document.createElement("label");
        labelEvento.textContent = "Selecione um evento:";
        const selectEvento = document.createElement("select");
        selectEvento.id = "evento-inscricao-input";

        for(let event of eventosDisponiveis) {
            const option = document.createElement("option");
            option.textContent = event.getDescription();
            option.value = event.getID();
            selectEvento.appendChild(option);
        }

        // Botões do formulário
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("form-buttons");

        const btnAceitar = this.makeButton("Accept");
        btnAceitar.addEventListener("click", async () => {
            let tbody = document.getElementById('eventos-membro-body');

            let actualIds = await this.getTableIds(tbody);

            let actualEvents = [];

            for(let id of actualIds) {
                let event = await EventManager.getEventById(Number(id.innerText));
                actualEvents.push(event);
            }

            let newEvent = await EventManager.getEventById(selectEvento.value);

            actualEvents.push(newEvent);

            let newTable = await this.replacePossibleEvents(actualEvents);

            document.getElementById('tabelaEventos').replaceChildren(newTable);
            formularioInscricao.remove();
        });

        const btnCancelar = this.makeButton("Cancel");
        btnCancelar.addEventListener("click", () => formularioInscricao.remove());

        buttonContainer.appendChild(btnAceitar);
        buttonContainer.appendChild(btnCancelar);

        formularioInscricao.appendChild(titulo);
        formularioInscricao.appendChild(labelEvento);
        formularioInscricao.appendChild(selectEvento);
        formularioInscricao.appendChild(buttonContainer);

        target.appendChild(formularioInscricao);
    }


    //---------------Tipos de Eventos---------------//

    static async gestaoTipoEventos() {
        let target = document.getElementById('gestaoTiposEventos');

        const divStructure = document.createElement('div'); 
        divStructure.classList.add("structure");

        const title = this.createTitle("Event Types", "h2");

        let eventTypes = await EventTypesManager.getEventTypes();

        let eventTypesTable = document.createElement('table');
        let tableHead = EventType.toTh();
        eventTypesTable.appendChild(tableHead);
        eventTypesTable.classList.add("table");

        let tableBody = document.createElement('tbody');
        for (let eventType of eventTypes) {
            tableBody.appendChild(eventType.toTR());
        }
        eventTypesTable.appendChild(tableBody);

        const divButtons = document.createElement('div'); 
        divButtons.classList.add("buttons");


        //---------------Criar os boões (Add/Edit/Delete)---------------//

        const buttonAddEventType = this.makeButton("Add EventType");
        buttonAddEventType.addEventListener("click", () => {
            UserInterface.setPage("formularioCriarTiposEvento");
        });

        const buttonEditEventType = this.makeButton("Edit EventType");
        buttonEditEventType.addEventListener("click", async () => {
            if(Selected.getRowID() > 0) {
                UserInterface.setPage("formularioEditarTiposEvento");
            }else {
                this.exibirMensagemErro("You need to select an Item!", "avisoTiposDeEvento");
            }
        });

        const buttonDeleteEventType = this.makeButton("Delete EventType", "avisoTiposDeEvento");
        buttonDeleteEventType.addEventListener("click", async () => {
                if (Selected.getRowID() < 0) {
                    this.exibirMensagemErro("You need to select an Item!", "avisoTiposDeEvento");
                } else {
                    await EventTypesManager.deleteEventType(Selected.getRowID());
                    UserInterface.setPage('gestaoTiposEventos');
                    Selected.clearRowID();
                }
        });

        divButtons.appendChild(buttonAddEventType);
        divButtons.appendChild(buttonEditEventType);
        divButtons.appendChild(buttonDeleteEventType);

        divStructure.appendChild(title);
        divStructure.appendChild(eventTypesTable);
        divStructure.appendChild(divButtons);

        const avisoEventos = this.createAlertError("avisoTiposDeEvento");
        avisoEventos.id = "avisoTiposDeEvento";

        divStructure.appendChild(avisoEventos);

        target.replaceChildren(divStructure);
    }

    static async formularioCriarTipoEvento() {
        let target = document.getElementById('formularioTipoEvento');

        const form = document.createElement("div");
        form.classList.add("formulario");

        const label = document.createElement("label");
        label.textContent = "Descritivo: ";
        label.setAttribute("for", "descritivo-tipo-input");

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "descritivo-tipo-input");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("form-buttons");

        const btnGravar = this.makeButton("Save");
        btnGravar.addEventListener("click",async () => {
            if(await EventTypesManager.eventTypeAlreadyExist(input.value) === false){
               await EventTypesManager.addEventType(input.value);
            } else {
                this.exibirMensagemErro("ERROR: This EventType already exists.", "avisoCriarTiposEventos");
            }
            
        });

        const btnCancelar = this.makeButton("Cancel");
        btnCancelar.addEventListener("click", () => UserInterface.setPage("gestaoTiposEventos"));

        buttonContainer.appendChild(btnGravar);
        buttonContainer.appendChild(btnCancelar);

        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(buttonContainer);

        const avisoEventos = this.createAlertError("avisoCriarTiposEventos");
        avisoEventos.id = "avisoCriarTiposEventos";
        
        form.appendChild(avisoEventos);

        target.replaceChildren(form);
    }

    static async formularioEditarTipoEvento() {
        if (Selected.getRowID() > 0) {
            let target = document.getElementById('formularioTipoEvento');

            const form = document.createElement("div");
            form.classList.add("formulario");

            const label = document.createElement("label");
            label.textContent = "Descritivo: ";
            label.setAttribute("for", "descritivo-tipo-input");

            const input = document.createElement("input");
            let id = Selected.getRowID();
            let eventType = EventTypesManager.getEventTypeById(id);
            input.value = (await eventType).getDescription();

            input.setAttribute("type", "text");
            input.setAttribute("id", "descritivo-tipo-input");

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("form-buttons");

            const btnGravar = this.makeButton("Save");
            btnGravar.addEventListener("click",async () => {
                if(!input.value){
                    UserInterface.exibirMensagemErro("ERROR: Please enter a description.", "avisoEditarTiposEventos");
                    return;
                }
                if((await EventTypesManager.getEventTypeById(Selected.getRowID)).getDescription() !== input.value){
                    EventTypesManager.editEventType(id, input.value);
                }
                else{
                    UserInterface.exibirMensagemErro("ERROR: This name already exists.", "avisoEditarTiposEventos");
                }
            });

            const btnCancelar = this.makeButton("Cancel");
            btnCancelar.addEventListener("click", () => {
                UserInterface.setPage("gestaoTiposEventos");
                Selected.clearRowID();
            });

            buttonContainer.appendChild(btnGravar);
            buttonContainer.appendChild(btnCancelar);

            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(buttonContainer);

            const avisoEventos = this.createAlertError("avisoEditarTiposEventos");
            avisoEventos.id = "avisoEditarTiposEventos";
            
            form.appendChild(avisoEventos);

            target.replaceChildren(form);
        } else {
            alert('Select a EventType to edit!');
        }
        
    }

    //---------------Eventos---------------//

    static async gestaoEventos() {
        let target = document.getElementById('gestaoEventos');

        const divStructure = document.createElement('div'); 
        divStructure.classList.add("structure");

        const title = this.createTitle("Events", "h2");

        let events = await EventManager.getEvents();

        let eventTable = document.createElement('table');
        let tableHead = Event.toTh();
        eventTable.appendChild(tableHead);
        eventTable.classList.add("table");

        let tableBody = document.createElement('tbody');
        for (let event of events) {
            tableBody.appendChild(await event.toTR());
        }
        eventTable.appendChild(tableBody);

        const divButtons = document.createElement('div'); 
        divButtons.classList.add("buttons");


        //---------------Criar os boões (Add/Edit/Delete)---------------//

        const buttonAddEvent = this.makeButton("Add Event");
        buttonAddEvent.addEventListener("click", () => {
            UserInterface.setPage("formularioCriarEvento");
        });

        const buttonEditEvent = this.makeButton("Edit Event");
        buttonEditEvent.addEventListener("click", async () => {
            if(Selected.getRowID() > 0) {
                UserInterface.setPage("formularioEditarEvento");
            }else {
                this.exibirMensagemErro("You need to select an Item!", "avisoEventos");
            }
        });

        const buttonDeleteEvent = this.makeButton("Delete Event");
        buttonDeleteEvent.addEventListener("click", async () => {
                if (Selected.getRowID() < 0) {
                    this.exibirMensagemErro("You need to select an Item!", "avisoEventos");
                } else {
                    await EventManager.deleteEvent(Selected.getRowID());
                    UserInterface.setPage('gestaoEventos');
                    Selected.clearRowID();
                }
        });

        divButtons.appendChild(buttonAddEvent);
        divButtons.appendChild(buttonEditEvent);
        divButtons.appendChild(buttonDeleteEvent);

        divStructure.appendChild(title);
        divStructure.appendChild(eventTable);
        divStructure.appendChild(divButtons);

        const avisoEventos = this.createAlertError("avisoEventos");
        avisoEventos.id = "avisoEventos";

        divStructure.appendChild(avisoEventos);

        target.replaceChildren(divStructure);
    }

    static async formularioCriarEvento(){
        let target = document.getElementById('formularioEvento');

        // Criar formulário
        const form = document.createElement("div");
        form.classList.add("formulario");
        form.id = "formularioEvento";

        const titulo = this.createTitle("Event", "h3");

        // Tipo (Dropdown)
        const labelTipo = document.createElement("label");
        labelTipo.textContent = "Tipo:";
        const selectTipo = document.createElement("select");
        selectTipo.id = "tipo-evento-input";

        let eventTypes = await EventTypesManager.getEventTypes();

        for(let eventType of eventTypes) {
            const option = document.createElement("option");
            option.textContent = eventType.getDescription();
            option.value = eventType.getID();
            selectTipo.appendChild(option);
        }

        const labelDescritivo = document.createElement("label");
        labelDescritivo.textContent = "Descritivo:";
        const inputDescritivo = document.createElement("input");
        inputDescritivo.type = "text";
        inputDescritivo.id = "descritivo-evento-input";

        const labelData = document.createElement("label");
        labelData.textContent = "Data:";
        const inputData = document.createElement("input");
        inputData.type = "date";
        inputData.id = "data-evento-input";

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("form-buttons");

        const btnGravar = this.makeButton("Save");
        btnGravar.addEventListener("click",async () => {
            if(await EventManager.eventAlreadyExists(Number(selectTipo.value), inputDescritivo.value, inputData.value) === false){
                EventManager.addEvent(selectTipo.value, inputDescritivo.value, inputData.value);
            } else {
                this.exibirMensagemErro("ERROR: Event already exists.", "avisoCriarEventos");
            }
            
        });

        const btnCancelar = this.makeButton("Cancel");
        btnCancelar.addEventListener("click", () => UserInterface.setPage('gestaoEventos'));

        buttonContainer.appendChild(btnGravar);
        buttonContainer.appendChild(btnCancelar);

        // Adiciona os elementos ao formulário
        form.appendChild(titulo);
        form.appendChild(labelTipo);
        form.appendChild(selectTipo);
        form.appendChild(labelDescritivo);
        form.appendChild(inputDescritivo);
        form.appendChild(labelData);
        form.appendChild(inputData);
        form.appendChild(buttonContainer);

        const avisoEventos = this.createAlertError("avisoCriarEventos");
        avisoEventos.id = "avisoCriarEventos";
        
        form.appendChild(avisoEventos);

        target.replaceChildren(form);
    }

    static async formularioEditarEvento(){
        if (Selected.getRowID() > 0) {
            let target = document.getElementById('formularioEvento');

            // Criar formulário
            const form = document.createElement("div");
            form.classList.add("formulario");
            form.id = "formularioEvento";

            const titulo = this.createTitle("Event", "h3");

            let id = Selected.getRowID();
            let selectedEvent = EventManager.getEventById(id);
            //let idType = selectedEvent.getIdType();

            // Tipo (Dropdown)
            const labelTipo = document.createElement("label");
            labelTipo.textContent = "Tipo:";
            const selectTipo = document.createElement("select");
            selectTipo.id = "tipo-evento-input";

            let eventTypes = await EventTypesManager.getEventTypes();

            for(let eventType of eventTypes) {
                const option = document.createElement("option");
                option.textContent = eventType.getDescription();
                option.value = eventType.getID();
                selectTipo.appendChild(option);

                if (eventType.getID() === (await selectedEvent).getIdType()) {
                    option.selected = true;
                }
            }

            // Descritivo
            const labelDescritivo = document.createElement("label");
            labelDescritivo.textContent = "Descritivo:";
            const inputDescritivo = document.createElement("input");
            inputDescritivo.type = "text";
            inputDescritivo.id = "descritivo-evento-input";
            inputDescritivo.value = (await selectedEvent).getDescription();

            // Data
            const labelData = document.createElement("label");
            labelData.textContent = "Data:";
            const inputData = document.createElement("input");
            inputData.type = "date";
            inputData.id = "data-evento-input";
            inputData.value = new Date((await selectedEvent).getDate()).toISOString().split("T")[0];

            // Botões
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("form-buttons");

            const btnGravar = this.makeButton("Save");
            btnGravar.addEventListener("click",async () => {
                if(!inputDescritivo.value){
                    UserInterface.exibirMensagemErro("ERROR: Please enter a description.", "avisoEditarEventos");
                    return;
                }
                if(!inputData.value){
                    UserInterface.exibirMensagemErro("ERROR: Please enter a date.", "avisoEditarEventos");
                    return;
                }
                EventManager.editEvent(id, selectTipo.value, inputDescritivo.value, inputData.value);
                
            });

            const btnCancelar = this.makeButton("Cancel");
            btnCancelar.addEventListener("click", () => {
                UserInterface.setPage('gestaoEventos');
                Selected.clearRowID();
            });

            buttonContainer.appendChild(btnGravar);
            buttonContainer.appendChild(btnCancelar);

            // Adiciona os elementos ao formulário
            form.appendChild(titulo);
            form.appendChild(labelTipo);
            form.appendChild(selectTipo);
            form.appendChild(labelDescritivo);
            form.appendChild(inputDescritivo);
            form.appendChild(labelData);
            form.appendChild(inputData);
            form.appendChild(buttonContainer);

            const avisoEventos = this.createAlertError("avisoEditarEventos");
            avisoEventos.id = "avisoEditarEventos";
        
            form.appendChild(avisoEventos);

            target.replaceChildren(form);
            target.style.display = "block"; // Garante que o formulário aparece
        } else {
            alert('Select a Event to edit!');
        }
        
    }


    static async getTableIds(table) {
        let ids = [];
        for (let i = 0; i < table.rows.length; i++) {
            let row = table.rows[i];
            ids.push(row.cells[0]);
        }

        return ids;
    }

    static makeButton(textContent) {
        const newButton = document.createElement('button');
        newButton.classList.add("btn");
        newButton.textContent = textContent;

        return newButton
    }

    static createTitle(textContent, size) {
        const title = document.createElement(size);
        title.textContent = textContent;

        return title;
    }

    static exibirMensagemErro(mensagem, id) {
        const labelErro = document.getElementById(id);
        if (!labelErro) return;

        labelErro.textContent = mensagem;
        labelErro.style.display = "block";

        // Ocultar após 3 segundos
        setTimeout(() => {
            labelErro.style.display = "none";
        }, 3000);
    }

    static createAlertError(id){
        const alert = document.createElement("div");
        alert.id = id;
        alert.style.color = "red";
        alert.style.marginTop = "10px";
        alert.style.fontWeight = "bold";
        alert.style.textAlign = "center";
        alert.style.display = "none";

        return alert;
    }
}


//---------------Gerir Membros---------------//
class MemberManager {

    static async getMembers () {
        let membersFetch = await fetchJson(`/member/`);
        let members = [];
        for(let entry of membersFetch.rows) {
            let newMember = new Member(entry.m_id, entry.m_name);
            members.push(
                newMember
            );
        }

        members.sort((a, b) => a.getID() - b.getID());

        return members;
    }

    static async getMembersById (id) {
        let entry = await fetchJson(`/member/${id}`);
        return new Member(entry.rows[0].m_id, entry.rows[0].m_name);
    }

    static async addMember(name) {
        if (!!name && await MemberManager.getMemberByName(name) === false) {
            await fetchJson(`/member/`, "POST", {name: name});
            UserInterface.setView('viewMembros');
            return true;
        }else {
            UserInterface.exibirMensagemErro("ERROR: Invalid data. Check the entered name.", "avisoCriarMembros");
        }
        return false;
    }

    static async editMember(id, newName) {
        if (!!newName) {
            await fetchJson(`/member/${id}`, "PUT", {name: newName});
            return true;
        }
        return false;
    }

    static async deleteMember(id) {
        await fetchJson(`/member/${id}`, "DELETE");
    }

    static async getMemberByName(name){
        let members = await this.getMembers();
        for(let member of members) {
            if(member.getName() === name) {
                return member;
            }
        }
        return false;
    }

}

class Member {
    #id; #name;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    } 
    
    getID() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    static toTH() {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const thId = document.createElement('th');
        const thName = document.createElement('th');

        thId.textContent = 'ID';
        thName.textContent = 'Name';

        headerRow.appendChild(thId);
        headerRow.appendChild(thName);

        thead.appendChild(headerRow);

        return thead;
    }

    toTR() {
        const tableRow = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdName = document.createElement('td');
        
        tdId.textContent = this.#id;
        tdName.textContent = this.#name;

        tableRow.appendChild(tdId);
        tableRow.appendChild(tdName);

        tableRow.classList.add('clickable');

        if(Selected.getRowID() == this.#id) {
            tableRow.setAttribute('id', 'selectedRow');
        }

        tableRow.addEventListener("click", () => {
            Selected.setRowID(Number(this.#id));
            document.querySelectorAll("tr").forEach(r => r.classList.remove("highlight"));
            tableRow.classList.add("highlight");
        });
        return tableRow;
    }

}


//---------------Gerir Tipos de Eventos---------------//
class EventTypesManager {

    static async getEventTypes() {
        let eventTypesFetch = await fetchJson(`/event-types/`);
        let eventTypes = [];
        for(let entry of eventTypesFetch.rows) {
            let newEventType = new EventType(entry.et_id, entry.et_description);
            eventTypes.push(
                newEventType
            );
        }

        eventTypes.sort((a, b) => a.getID() - b.getID());

        return eventTypes;
    }

    static async getEventTypeById(id){
        let entry = await fetchJson(`/event-types/${id}`);
        return new EventType(entry.rows[0].et_id, entry.rows[0].et_description);
    }

    static async addEventType(description) {
        if (description) {
            await fetchJson(`/event-types/`, "POST", {description : `${description}`});
            UserInterface.setView("viewTiposEventos");
            return true;
        } else {
            UserInterface.exibirMensagemErro("ERROR: Invalid data. Check the entered the description.", "avisoCriarTiposEventos");
            return false;
        }
    }

    static async editEventType(id, newDescription) {
        if (newDescription) {
            await fetchJson(`/event-types/${id}`, "PUT", {description : `${newDescription}`});
            UserInterface.setView("viewTiposEventos");
        } else {
            UserInterface.exibirMensagemErro("ERROR: Invalid data. Check the entered the description.", "avisoEditarTiposEventos");
        }
    }

    static async deleteEventType(id) {
        await fetchJson(`/event-types/${id}`, "DELETE");
    }

    static async eventTypeAlreadyExist(name) {
        let eventTypes = await this.getEventTypes();

        for(let type of eventTypes) {
            if(type.getDescription() === name) {
                return type;
            }
        }

        return false;
    }

}

class EventType{

    #id; #description;

    constructor(id, description) {
        this.#id = id;
        this.#description = description;
    }

    getID() {
        return this.#id;
    }

    getDescription() {
        return this.#description;
    }

    static toTh() {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const thId = document.createElement('th');
        const thDescription = document.createElement('th');

        thId.textContent = "ID";
        thDescription.textContent = "Descritivo";

        headerRow.appendChild(thId);
        headerRow.appendChild(thDescription);

        thead.appendChild(headerRow);

        return thead;
    }

    toTR() {
        const tableRow = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdDescription = document.createElement('td');

        tdId.textContent = this.#id;
        tdDescription.textContent = this.#description;

        tableRow.appendChild(tdId);
        tableRow.appendChild(tdDescription);

        tableRow.classList.add('clickable');

        if(Selected.getRowID() == this.#id) {
            tableRow.setAttribute('id', 'selectedRow');
        }

        tableRow.addEventListener("click", () => {
            Selected.setRowID(Number(this.#id));
            document.querySelectorAll("tr").forEach(r => r.classList.remove("highlight"));
            tableRow.classList.add("highlight");
        });
        return tableRow;
    }

}

//---------------Gerir Eventos---------------//
class EventManager {
    static async getEvents() {
        let eventsFetch = await fetchJson(`/event/`);
        let events = [];
        for(let entry of eventsFetch.rows) {
            events.push(new Event(entry.e_id, entry.e_id_type, entry.e_description, entry.e_date));
        }

        events.sort((a, b) => a.getID() - b.getID());

        return events;
    }

    static async getEventById(id){
        let entry = await fetchJson(`/event/${id}`);
        return new Event(entry.rows[0].e_id, entry.rows[0].e_id_type, entry.rows[0].e_description, entry.rows[0].e_date);
    }

    static async addEvent(type, description, date) {
        if (type && description && date) {
            await fetchJson(`/event/`, "POST", {
                id_type: type,           
                description: description,
                date: date                // Same for date
            });
            UserInterface.setView("viewEventos");
            return true;
        } 
        if (!description ){
            UserInterface.exibirMensagemErro("ERROR: Check the entered description.", "avisoCriarEventos"); 
            return false;
        }
        if (!date ){
            UserInterface.exibirMensagemErro("ERROR: Check the entered date.", "avisoCriarEventos"); 
            return false;
        }
    }

    static async editEvent(id, newType, newDescription, newDate) {
        if (newType && newDescription && newDate) {
            await fetchJson(`/event/${id}`, "PUT", {
                id_type: newType,           
                description: newDescription,
                date: newDate               
            });
            UserInterface.setView("viewEventos");
        } 
        if (!newDescription ){
            UserInterface.exibirMensagemErro("ERROR: Check the entered description.", "avisoEditarEventos"); 
            return false;
        }
        if (!newDate ){
            UserInterface.exibirMensagemErro("ERROR: Check the entered date.", "avisoEditarEventos"); 
            return false;
        }
    }

    static async deleteEvent(id) {
        await fetchJson(`/event/${id}`, "DELETE");
    }

    static async eventAlreadyExists(id_type, description, date) {
        let events = await this.getEvents();

        for(let event of events) {
            if(event.getIdType() === id_type && event.getDescription() === description && new Date(event.getDate()).toLocaleDateString('en-CA') === date){
                return event;
            }
        }
        return false;
    }
}

class Event{
    #id; #id_type; #description; #date;

    constructor(id, id_type, description, date) {
        this.#id = id;
        this.#id_type = id_type;
        this.#description = description;
        this.#date = date;
    }

    getID() {
        return this.#id;
    }

    getIdType() {
        return this.#id_type;
    }

    getDescription() {
        return this.#description;
    }

    getDate() {
        return this.#date;
    }

    static toTh() {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const thId = document.createElement('th');
        const thIdType = document.createElement('th');
        const thDescription = document.createElement('th');
        const thDate = document.createElement('th');

        thId.textContent = "ID";
        thIdType.textContent = "Tipo";
        thDescription.textContent = "Descritivo";
        thDate.textContent = "Data";

        headerRow.appendChild(thId);
        headerRow.appendChild(thIdType);
        headerRow.appendChild(thDescription);
        headerRow.appendChild(thDate);

        thead.appendChild(headerRow);

        return thead;
    }

    async toTR() {
        const tableRow = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdIdType = document.createElement('td');
        const tdDescription = document.createElement('td');
        const tdDate = document.createElement('td');

        tdId.textContent = this.#id;
        let typeDescription = (await EventTypesManager.getEventTypeById(this.#id_type)).getDescription();
        tdIdType.textContent = typeDescription;
        tdDescription.textContent = this.#description;
        tdDate.textContent = new Date(this.#date).toLocaleDateString('en-CA');

        tableRow.appendChild(tdId);
        tableRow.appendChild(tdIdType);
        tableRow.appendChild(tdDescription);
        tableRow.appendChild(tdDate);

        tableRow.classList.add('clickable');

        if(Selected.getRowID() == this.#id) {
            tableRow.setAttribute('id', 'selectedRow');
        }

        tableRow.addEventListener("click", () => {
            Selected.setRowID(Number(this.#id));
            document.querySelectorAll("tr").forEach(r => r.classList.remove("highlight"));
            tableRow.classList.add("highlight");
        });

        return tableRow;
    }
}


//---------------Gerir Eventos de Cada Membro---------------//
class MemberEventManager {

    static async getMemberEventsByMember(id){
        let memberEventsFetch = await fetchJson(`/member-event/`);
        let memberEvents = [];
        for(let entry of memberEventsFetch.rows) {
            if(entry.me_id_member === id) {
                memberEvents.push(new MemberEvent(entry.me_id, entry.me_id_member, entry.me_id_event));
            }
        }
        return memberEvents;
    }

    static async getEventsByMember(id) {
        let memberEventsFetch = await fetchJson(`/member-event/`);
        let events = [];
        for(let entry of memberEventsFetch.rows) {
            if(entry.me_id_member === id) {
                let event = await EventManager.getEventById(entry.me_id_event)
                events.push(new Event(event.getID(), event.getIdType(), event.getDescription(), event.getDate()));
            }
        }

        return events;
    }

    static async addMemberEvent(id_member, id_event) {
        if (id_member && id_event) {
            await fetchJson(`/member-event/`, "POST", {
                member: id_member,           
                event: id_event,
            });
            return true;
        } else {
            alert('ERROR: Invalid data. Check the entered data.');  
            return false;
        }
    }

    static async deleteMemberEvent(id) {
        await fetchJson(`/member-event/${id}`, "DELETE");
    }
}

class MemberEvent {
    #id;  #id_member; #id_event;

    constructor(id, id_member, id_event) {
        this.#id = id;
        this.#id_event = id_event;
        this.#id_member = id_member; 
    }

    getID() {
        return this.#id;
    }

    getIdEvent() {
        return this.#id_event;
    }

    getIdMember() {
        return this.#id_member;
    }
}

//---------------Gerir Tipos de Eventos Preferidos de Cada Membro---------------//

class MemberEventTypesManager {

    static async getMemberEventType(){
        let MemberEventsTypesFetch = await fetchJson(`/member-event-type/`);
        let events = [];
        for(let entry of MemberEventsTypesFetch.rows) {
            events.push(new MemberEventType(entry.met_id, entry.met_id_member, entry.met_id_event_type));
        }

        return events;
    }

    static async getEventsTypeByMember(id) {
        let MemberEventsTypesFetch = await fetchJson(`/member-event-type/`);
        let eventTypes = [];
        for(let entry of MemberEventsTypesFetch.rows) {
            if(entry.met_id_member === id) {
                let eventType = await EventTypesManager.getEventTypeById(entry.met_id_event_type)
                eventTypes.push(new EventType(eventType.getID(), eventType.getDescription()));
            }
        }

        return eventTypes;
    }

    static async addEventTypeMember(id_member, id_event_type){
        if (id_member && id_event_type) {
            await fetchJson(`/member-event-type/`, "POST", {
                id_member: id_member,           
                id_event_type: id_event_type,
            });
            return true;
        } else {
            alert('ERROR: Invalid data. Check the entered data.');  
            return false;
        }
    }

    static async deleteEventTypeMember(id) {
        await fetchJson(`/member-event-type/${id}`, "DELETE");
    }

    static async alreadyExists(id_member, id_event_type) {
        let membersEventTypes = await this.getMemberEventType();
        for(let event of membersEventTypes) {
            if(event.getIdMember() === id_member && event.getIdEventType() === id_event_type) {
                return true;
            }
        }
        return false;
    }

    static async findEventTypeMember(id_member, id_event_type) {
        let membersEventTypes = await this.getMemberEventType();
        for(let event of membersEventTypes) {
            if(event.getIdMember() === id_member && event.getIdEventType() === id_event_type) {
                return event.getID();
            }
        }
    }
}

class MemberEventType {
    #id;  #id_member; #id_event_type;

    constructor(id, id_member, id_event_type) {
        this.#id = id;
        this.#id_event_type = id_event_type;
        this.#id_member = id_member; 
    }

    getID() {
        return this.#id;
    }

    getIdEventType() {
        return this.#id_event_type;
    }

    getIdMember() {
        return this.#id_member;
    }
}


window.onload = function () {
    start();
};


async function fetchJson(url, method, body) {
    var options = {
        headers: {
            "Accept": "application/json"
        }
    };
    if (body) {
        options.method = method || "POST";
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json";
    } else {
        options.method = method || "GET";
    }
    let response = await fetch(url, options);
    return response.ok ? await response.json() : void 0; //Eventually, deal with error message
}