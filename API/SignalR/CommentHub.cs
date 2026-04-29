using System;
using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

[Authorize]
public class CommentHub(IMediator mediator) : Hub
{
    public async Task SendComment(AddComment.Command command)
    {
        var comment = await mediator.Send(command);
        await Clients.Group(command.ActivityId).SendAsync("ReceiveComment", comment.Value);
    }
    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var activityId = httpContext?.Request.Query["activityId"].ToString();

        if (string.IsNullOrEmpty(activityId)) throw new HubException("No activity id provided");
    
        await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
        var result = await mediator.Send(new GetComments.Query{ActivityId = activityId});

        await Clients.Caller.SendAsync("LoadComments", result.Value);
    }
}
