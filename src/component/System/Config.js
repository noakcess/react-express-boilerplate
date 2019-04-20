import React, {Component} from 'react'

// import { map } from 'underscore';

import { Toast, ToastBody, ToastHeader } from 'reactstrap'; /* , Spinner */
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import { Form } from 'reactstrap';
import { Badge } from 'reactstrap';


import { FormInput, FormSelect, FormButton } from 'Input/Common';

import { Util, ConfigService } from 'Service/Common';

import { SystemContext } from 'Context/SystemContext';

import { last } from 'underscore';
import 'Css/Config.scss';

const Log = window.Log;

class Config extends Component {
    config = false;
    state = {
        loaded: false,
        messages: [],
        collapsed: [],
        form: this.context.Config.form
    };
    
    componentWillMount() {
        const context = this.context;
        const { form = {} } = context.Config;
        ConfigService.load()
            .then(( config = false ) => {
                this.config = config;
                Log.info({ config, thisConfig: this.config });
                this.setState({ loaded: true, form: { ...form, ...config } || form });
            });
        
        
    }
    handleClear = (e) => {
        Log.info(e);
    };
    handleSave = (e) => {
        Log.info(e);
        const { form } = this.state;
        ConfigService.save(form)
            .then(response => {
                Log.info({ response });
            })
    };
    handleMessages = (field) => {
        let { form, messages = [] } = this.state;
        const changed = Util.compare(form, this.config, false);
        if (changed) messages = [];
        else if(['host', 'port', 'socket'].includes(field)) {
            const text = 'Requires Restart Of Server';
            if (!messages.includes(text)) messages.push(text);
        }
        this.setState({ messages });
        
    };
    handleOnChange = (e) => {
        const { target } = e.nativeEvent;
        const { name, value } = target;
        let { form } = this.state;
        const fields = name.split('.');
        
        Log.info({ target, name, value, fields, form });
        this.handleMessages(last(fields));
        if (fields.length === 2) form[fields[1]] = value;
        else if (fields.length === 3) form[fields[1]][fields[2]] = value;
        else if (fields.length === 4) form[fields[1]][fields[2]][fields[3]] = value;
        else if (fields.length === 5) form[fields[1]][fields[2]][fields[3]][fields[4]] = value;
        
        this.setState({ form });
        
    };

    toggleCollapse = (service) => {
        let collapsed = this.state.collapsed || [];
        if (collapsed.includes(service)) collapsed = collapsed.filter(temp => temp !== service);
        else collapsed.push(service);
        Log.info({collapsed});
        this.setState({collapsed})
    };
    _renderConfig = (id, config = {}) => {
        const list = Object.keys(config);
        const listeners = { onChange: this.handleOnChange };
        const { name=false, host=false, port=false, pass = false, database = false } = config;
        Log.info({ list, name, host, port, pass, database });
        return (
            <div className={'Settings'} title={list.join('; ')}>
                {name !== false ? <FormInput name={`${id}config.name`} value={name} required {...listeners} /> : null}
                {host !== false ? <FormInput name={`${id}config.host`} value={host} required {...listeners} /> : null}
                {port !== false ? <FormInput name={`${id}config.port`} value={port} required {...listeners} /> : null}
                {pass !== false ? <FormInput name={`${id}config.pass`} value={pass} required {...listeners} /> : null}
                {database  !== false ? <FormInput name={'database'} value={database} required {...listeners} /> : null}
            </div>
        )
    };
    _renderServiceActions =  (id) => {
        const onClick = (action) => {
            Log.info({ id, action });
        };
        const actions = ['start', 'stop', 'restart', 'backup'];
        return (
            <div>
                {actions.map((action, index) => {
                    return (
                        <button type={'button'} className={'btn'}
                             key={index}
                             onClick={onClick.bind(this, action)}
                        >
                            {action}
                        </button>
                    )
                })}
            </div>
        )
    };
    _renderOpts = (id, opts = {}) => {
        const { active, source, backup, config } = opts || {};
        const list = Object.keys(opts);
        const listeners = { onChange: this.handleOnChange };
        const { collapsed = [] } = this.state;
        return (
            <ToastBody>
                <Form title={list.join('; ')}>
                    <div className={'form-group'}>
                        {this._renderServiceActions(id)}
                    </div>
                    <FormSelect name={`${id}active`} value={active} opts={['true','false']} {...listeners} />
                    <FormInput name={`${id}source`} value={source} required {...listeners} />
                    <FormInput name={`${id}backup`} value={backup} required {...listeners} />
                    <hr />
                    <div className={'link'} title={JSON.stringify(config)} onClick={this.toggleCollapse.bind(this, id)}>Config</div>
                    {collapsed.includes(id) ? this._renderConfig(id, config) : null}
                </Form>
            </ToastBody>
        )
    };

    renderServiceMysql = ({opts = {}}) => {
        return (
            <Toast className={'mysql'}>
                <ToastHeader icon='primary'>
                    MySql
                </ToastHeader>
                {this._renderOpts('form.services.mysql.', opts)}
            </Toast>
        )
    };
    renderServiceRedis = ({opts = {}}) => {
        return (
            <Toast className={'redis'}>
                <ToastHeader icon='primary'>
                    Redis
                </ToastHeader>
                {this._renderOpts('form.services.redis.', opts)}
            </Toast>
        )
    };
    renderServiceMongo = ({opts = {}}) => {
        return (
            <Toast className={'mongo'}>
                <ToastHeader icon='primary'>
                    Mongo
                </ToastHeader>
                {this._renderOpts('form.services.mongo.', opts)}
            </Toast>
        )
    };
    renderService = (service = false, opts = {}) => {
        
        const label = `renderService${service}`;
        const render = (typeof(this[label]) === 'function'
            ? <div className={'w-100'}>{this[label]({ opts })}</div>
            : <div>unknown</div>);
        
        return <React.Fragment key={service || `service-${Date.now()}` }>{render}</React.Fragment>
    };
    
    render () {
        const { loaded = false, messages = [], form = {}, collapsed = [] } = this.state;
        
        const listeners = { onChange: this.handleOnChange };

        const { name = false, port = false, socket = false, code = false, readonly = false, dateModified = false } = form || {};
        Log.info({ form });
        if (loaded === false) return null;
        return (
            <div className={'d-flex flex-column Config'}>
                <div className={'Messages w-100 d-flex justify-content-center'}>
                    {messages.map((message, index )=> {
                        return <Badge key={index}>{message}</Badge>
                    })}
                </div>
                
                <ListGroup className={'w-50'}>
                    <ListGroupItem color='info'>
                        <ListGroupItemHeading title={Object.keys(form).join('; ')}>
                            Config
                        </ListGroupItemHeading>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Form>
                            <FormInput name={'form.name'} value={name} required {...listeners} />
                            <FormInput name={'form.port'} value={port} required {...listeners} />
    
                            <FormInput name={'form.socket'} value={socket} required {...listeners} />
    
                            <FormInput name={'form.code'} value={code} required {...listeners} />
                            <FormSelect name='form.readonly' value={readonly} opts={['true','false']} {...listeners} />
                            <FormInput name={'form.dateModified'} value={Util.formatDate(dateModified)} required {...listeners} />
                            <div>
                                <FormButton label={'Save'} onClick={this.handleSave} />
                                <FormButton label={'Cancel'} onClick={this.handleClear} />
                            </div>
                        </Form>
                    </ListGroupItem>
                    {Object.keys(form.services).map(service => {
                        return (
                            <ListGroupItem key={service}>
                                <ListGroupItemHeading className={'link'} onClick={this.toggleCollapse.bind(this, service)}>
                                    {Util.ucfirst(service)}
                                </ListGroupItemHeading>
                                {collapsed.includes(service)
                                    ? this.renderService(Util.ucfirst(service), form.services[service])
                                    : null
                                }
                                
                            </ListGroupItem>
                        )
                        
                    })}
                    
                </ListGroup>
            </div>
        )
    }
}

Config.contextType = SystemContext;

export default Config;
